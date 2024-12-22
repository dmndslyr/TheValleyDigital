# The Valley Digital  

The Valley Digital is an online school news platform designed to promote student journalism and provide a centralized hub for stakeholders to stay informed about school-related news and events.  

---

## Project Structure  

/project_root  
├── backend/  
│   ├── venv/                # Virtual environment folder (excluded from version control)  
│   ├── manage.py            # Django's main project file  
│   ├── requirements.txt     # Python dependencies for backend  
│   ├── [other backend files]  
├── frontend/                # Frontend (if applicable)  

## Backend Information
The backend of this project is built with the Django framework. The virtual environment (venv) is located inside the backend folder. Follow the steps below to set up and run the backend server.

Setup Instructions
1. Create and Activate the Virtual Environment
- Navigate to the backend folder in your terminal:

	Windows:
	cd path\to\your\project\backend

- Create a new virtual environment:

	python -m venv venv

- Activate the virtual environment:

	venv\Scripts\activate

- You should see (venv) in your terminal prompt, indicating that the virtual environment is active.

2. Install Dependencies
- With the virtual environment activated, install the required dependencies from requirements.txt:

	pip install -r requirements.txt

-  This will install all necessary packages, including Django and other libraries.

3. Run the Development Server
- Ensure the virtual environment is activated and you are in the backend folder. Start the Django development server:

	python manage.py runserver

- The server will start, and you can access the application in your browser at:

	http://127.0.0.1:8000/

## Additional Notes
- Ensure Python 3.12 or later is installed on your system.
- The requirements.txt file lists all dependencies for the backend.
- The venv/ folder should not be included in version control. Add venv/ to your .gitignore file to exclude it.
- To deactivate the virtual environment, run:

	deactivate

## Troubleshooting
If you encounter issues during setup or while running the project:
- Ensure the correct Python version is installed.
- Verify that all dependencies listed in requirements.txt are installed.
- Check for any error messages in the terminal and resolve missing dependencies or incorrect configurations.
- For further assistance, feel free to reach out to the project maintainer.
