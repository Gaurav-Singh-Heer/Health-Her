# Health&Her

<h1 align="center">
  <br>
  <a href=".."><img src="public/images/pink-cosmos.png" alt="Health&Her" width="100"></a>
  <br>
  Health&Her
  <br>
</h1>
<h3 align="center">
  A complete health companion for women.
</h3>b

<h4 align="center">Track your periods, get personalized nutrition, and chat with experts about PCOS, menopause, and more.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#technologies-and-apis-used">Technologies and APIs Used</a> •
  <a href="#demo">Demo</a> •
  <a href="#future-work">Future Work</a> •
  <a href="#how-to-use">How To Use</a>  
</p>

## Key Features

- **Period Tracker**: Log and track your menstrual cycle, with alerts for irregularities.
- **PCOS/Menopause Detection Quiz**: If irregular periods are detected, the app directs users to a quiz to assess potential PCOS, menopause, or pregnancy symptoms.
- **Personalized Nutrition**: Get meal recommendations for:
  - **Breakfast**
  - **Weight loss**
  - **Diabetes-friendly diet**
  - **General women’s health**
- **Health Chatbot**: AI-driven chatbot focusing on women’s health topics:
  - Different phases of the menstrual cycle
  - PCOS concerns
  - Menopause guidance
- **Authentication**: Secure user authentication using MongoDB.
- **Mobile & Web Ready**: Works seamlessly on different devices.

## Technologies and APIs Used

The app is hosted with MongoDB Atlas cloud database and uses ExpressJS for the backend.

- **Backend:** NodeJS, ExpressJS, MongoDB
- **Frontend:** Bootstrap, jQuery
- **APIs & Libraries:**
  - [jsCalendar](https://gramthanos.github.io/jsCalendar/index.html) for period tracking
  - [Spoonacular API](https://spoonacular.com/food-api/docs#Generate-Meal-Plan) for meal recommendations
  - Custom chatbot integration for women’s health

<!-- ## Demo

Watch the walkthrough video here: **[Demo Link]()** -->

![](healthandher-demo.gif)

## Future Work

- **Community Forum**: A space where users can connect with experts and each other.
- **Real-time Health Alerts**: Notifications for medical checkups, self-examinations, and period care.
- **Enhanced Chatbot**: AI-driven chatbot to provide personalized advice and resources.

## 🛠 Technologies and APIs Used  

The app is hosted with **MongoDB Atlas** cloud database and uses **ExpressJS** for the backend.  

### 🔹 Backend  
- Node.js  
- Express.js  
- MongoDB  

### 🔹 Frontend  
- Bootstrap  
- EJS  
- JavaScript  

### 🔹 APIs & Libraries  
- [jsCalendar](https://gramthanos.github.io/jsCalendar/index.html) – For period tracking  
- AI-powered chatbot – For personalized health support  


## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) installed. Before starting, create a `.env` file and add your private keys (use `example.env` as a template). From your command line:

```bash
# Clone this repository
$ git clone https://github.com/your-username/Health-Her.git

# Go into the repository
$ cd Health-Her

# Install dependencies
$ npm install

# Run the app
$ npm start
```

Note: If using Linux Bash for Windows, check [this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

---

### Contribute
Contributions are welcome! Feel free to submit issues or pull requests to improve Health&Her.

---

**Made with ❤️ for women's health**

