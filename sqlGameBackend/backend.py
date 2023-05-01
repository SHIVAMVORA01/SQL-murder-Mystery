import dataframe_image as dfi
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from flask_cors import CORS
import pandas as pd
import sqlite3 as sql
import os
app = Flask(__name__)
cors = CORS(app)
api = Api(app)
app.config['CORS_HEADERS'] = 'Content-Type'
con = sql.connect(r'C:\Users\dhrum\Desktop\SQL Game\sqlGameBackend\sql-murder-mystery.db',check_same_thread=False)
queries=[
    '''
SELECT *
FROM crime_scene_report
WHERE city = "SQL City"
ORDER BY date;
''',
'''
SELECT *
FROM person
WHERE address_street_name = "Northwestern Dr"
ORDER BY address_number desc;
''',
'''
SELECT *
FROM person
WHERE name like '%Annabel%' AND address_street_name = "Franklin Ave";
''',
'''
SELECT *
FROM interview
WHERE person_id = 14887 OR person_id = 16371;
''',
'''
SELECT *
FROM get_fit_now_check_in 
WHERE membership_id like "%48Z%" AND check_in_date = 20180109 
order by check_in_date;
''',
'''
SELECT *
FROM drivers_license
WHERE plate_number like "%H42W%";
''',
'''
SELECT *
FROM person
WHERE license_id = "423327" OR license_id = "664760";
''',
'''
SELECT *
FROM get_fit_now_member
WHERE person_id = "51739" OR person_id = "67318";
''',

]
output=[]
	 
def findAllAnswers():
	for query in queries:
		output.append(pd.read_sql_query(query, con))
	return

class GameBackend(Resource):
	def post(self):
		try:
			
			query= request.form['query']
			level=request.form['level']
			queryResult=pd.read_sql_query(query,con)
			result=queryResult.equals(output[int(level)])
			if os.path.isfile(r'C:\Users\dhrum\Desktop\SQL Game\sqlgame\src\output.png'):
				os.remove(r'C:\Users\dhrum\Desktop\SQL Game\sqlgame\src\output.png')
			
			dfi.export(queryResult, r'C:\Users\dhrum\Desktop\SQL Game\sqlgame\src\output.png')
			response= jsonify({'data': result})
			response.status_code=200
			return response
		except Exception as e :
			print(e)
			if os.path.isfile(r'C:\Users\dhrum\Desktop\SQL Game\sqlgame\src\output.png'):
				os.remove(r'C:\Users\dhrum\Desktop\SQL Game\sqlgame\src\output.png')
			response = jsonify({'error':'Its a syntax error'})
			response.status_code=400
			return response


            





# adding the defined resources along with their corresponding urls
api.add_resource(GameBackend, '/check')



# driver function
if __name__ == '__main__':
	findAllAnswers()
	app.run(debug = True)
