from flask import Flask, render_template, redirect, url_for, request, send_file, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, LoginManager, login_user, login_required, logout_user
# from flask_wtf import FlaskForm
# from wtforms import StringField, PasswordField, SubmitField
# from wtforms.validators import InputRequired, Length
import uuid
import qrcode
from io import BytesIO
from PIL import Image
import base64
import pandas
import openpyxl
from fileinput import filename
import datetime
import pytz
import json
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SECRET_KEY'] = '9370a072-fb16-4ad1-93bb-85e5ca54a7ad'
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)


class Employee(db.Model):
    uid = db.Column(db.String(180), primary_key=True)
    name = db.Column(db.LargeBinary)  # Assuming binary field for employee's name
    company_name = db.Column(db.String(180), nullable=False)
    date_of_joining = db.Column(db.String(180), nullable=False)
    combined_pdf = db.Column(db.LargeBinary, nullable=True)  # Store combined PDF file
    created_at = db.Column(db.DateTime, default=datetime.datetime.now(pytz.timezone('Asia/Kolkata')))



@app.route('/dashboard', methods=['GET','POST'])
#@login_required
def show_dashboard():
    return render_template('dashboard.html')

#api to get the user info
@app.route('/api/<string:uid>', methods=['GET','POST'])
def api(uid):
    record = Employee.query.filter_by(uid=uid).first()
    response = {
        "uid": record.uid,
        "name": record.name,
        "company_name": record.company_name,
        "date_of_joining": record.date_of_joining,
        }
    return jsonify(response)

@app.route('/', methods=['GET','POST'])
def show_login_page():
    return render_template('login.html',incorrect=False)


#adding records to list, and making a single pdf
@app.route('/importer', methods=['GET', 'POST'])
@login_required
def show_importer():
    if request.method == 'POST':
        files = request.files.getlist('files') 
        combined_text = ""

        translator = Translator()

        for file in files:
            filename = file.filename
            file_ext = os.path.splitext(filename)[1]
            if file_ext == ".pdf":
                extracted_text = extract_text_from_pdf(file)
                combined_text += extracted_text
            elif file_ext == ".txt":
                file_content = file.read().decode('utf-8')
                combined_text += file_content

        processed_text = preprocess_text(combined_text)

        translated_text = translator.translate(processed_text, dest='en').text

        pdf_data = create_pdf_from_text(translated_text)

        new_uid = str(uuid.uuid4())
        new_employee = Employee(uid=new_uid, name=b'Aryan', company_name="GAIL", date_of_joining="2022-01-01", combined_pdf=pdf_data)
        db.session.add(new_employee)
        db.session.commit()

        return render_template('add_record.html')

    return render_template('add_record.html')


def extract_text_from_pdf(file):
    pdf_text = ""
    pdf_document = fitz.open(stream=file.read(), filetype="pdf")
    for page_num in range(pdf_document.page_count):
        page = pdf_document.load_page(page_num)
        pdf_text += page.get_text("text")
    pdf_document.close()
    return pdf_text


def preprocess_text(text):
    
    text = text.strip().replace('\n', ' ')
    return text


def create_pdf_from_text(text):

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    for line in text.splitlines():
        pdf.cell(200, 10, txt=line, ln=True)

    buffer = BytesIO()
    pdf.output(buffer)
    buffer.seek(0)
    return buffer.getvalue()



@app.route('/preview/<qid>')
def show_preview(qid):
    record = Employee.query.filter_by(uid=qid).first()
    if record and record.combined_pdf:
        # Convert the binary PDF data to a Base64 string for rendering
        pdf_data = base64.b64encode(record.combined_pdf).decode('utf-8')
        pdf_data_url = f'data:application/pdf;base64,{pdf_data}'
        return render_template('preview.html', pdf_data_url=pdf_data_url, uid=qid)
    else:
        return "No PDF found for this record", 404


@app.route('/download/<qid>')
def download(qid):
    record = Employee.query.filter_by(uid=qid).first()
    if record and record.combined_pdf:
        return send_file(
            BytesIO(record.combined_pdf),
            attachment_filename=f'Employee_{qid}.pdf',
            as_attachment=True,
            mimetype='application/pdf'
        )
    else:
        return "No PDF found for this record", 404



if __name__ == '__main__':
    app.run(debug=True)