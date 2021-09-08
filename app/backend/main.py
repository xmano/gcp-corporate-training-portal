import requests
import json
import os
from flask import escape
from flask_cors import CORS, cross_origin

@cross_origin()
def receive_request(request):
    request_form = request.form

    if request_form and 'inputName' and 'inputLastname' and 'inputEmail' in request_form:
        firstname = request_form['inputName']
        lastname = request_form['inputLastname']
        email = request_form['inputEmail']

        result = moodle_user_create(email,firstname,lastname)

        if result == 'success':
            return 'Request received successfully.'
        else:
            print('RR:ERROR:USER_CREATION_FAILED')
            return 'Error, contact your system administrator!'
    else:
        print('RR:ERROR:PARAMETER_NOT_FOUND')
        return 'Error, contact your system administrator!'

def moodle_user_create(email,firstname,lastname):
    
    token = os.environ.get('MOODLE_TOKEN')
    server = os.environ.get('MOODLE_SERVER')

    function = 'core_user_create_users'
    url = 'http://{0}/webservice/rest/server.php?wstoken={1}&wsfunction={2}&moodlewsrestformat=json'.format(server,token,function)

    email = email
    username = email.split("@")[0]

    users = {'users[0][username]': username,
            'users[0][email]': email,
            'users[0][lastname]': lastname,
            'users[0][firstname]': firstname,
            'users[0][password]': 'P@40ssword123'}

    try:
        response = requests.post(url,data=users)
        if 'exception' in json.loads(response.text):
            print('Result: ' + response.text)
            return 'error'
        else:
            print('Result: ' + response.text)
            return 'success'
    except Exception as e:
        print(e)
        return 'error'

