The Valley Digital is an online school news platform designed to promote student journalism and provide a centralized hub for stakeholders to stay informed about school-related news and events.

BACKEND Information:
The backend of this project is entirely made with Django Framework. The virtual environment (venv) is located inside the backend folder of the project. Follow the steps below to set up the environment and install all necessary dependencies.

Project Structure
/project_root
	├── backend/
	│   ├── venv/               # Virtual environment folder
	│   ├── manage.py
	│   ├── [other backend files]
  |   ├── requirements.txt        # Python dependencies for backend
  ├── frontend/               # Frontend (if applicable)
   
Setup Instructions
1. Create and Activate the Virtual Environment
The virtual environment is located in the backend/ folder. Follow these steps to create and activate it.

For Windows:
Open Command Prompt or PowerShell and navigate to the backend folder:

cd path\to\your\project\backend

Create a new virtual environment:
python -m venv venv

Activate the virtual environment:
venv\Scripts\activate

You should see (venv) in your terminal prompt, indicating that the virtual environment is active.

2. Install Dependencies
With the virtual environment activated, install the required frameworks from requirements.txt:

pip install -r requirements.txt

This will install all the necessary dependencies for the backend, such as Django and other required libraries.

3. Running the Project
Once the environment is set up, you can run the Django development server:

Make sure you’re still in the backend folder with the virtual environment activated.

Run the following command:

python manage.py runserver

The server will start, and you can access the project in your browser at http://127.0.0.1:8000/.

Additional Notes
Ensure you have Python 3.12 installed on your system.
The requirements.txt file includes all necessary packages for the backend, including Django and other libraries.
The venv/ folder should be ignored by version control (e.g., make sure venv/ is in your .gitignore file).

If you need to deactivate the virtual environment after use, run:

deactivate

If you encounter issues during setup or running the project, ensure that you have the correct version of Python installed and check for any missing dependencies in requirements.txt.
For any other questions or assistance, please reach out to the project maintainer.
