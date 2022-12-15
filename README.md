<!--- The following README.md sample file was adapted from https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md by Gabriella Mosquera for academic use --->

# Group 8 : 'Investable'

Taking the respective design challenge into consideration. We came up with a proposed technological innovation idea. We plan to build a website, a common platform for investors and start-ups to communicate. Investors will see a posts feed where they will only see posts from companies and products that interest them. Investors will be able to quickly scroll through the executive summary or elevator pitch of various companies thanks to this. Investors who are interested in learning more about a company can click the post to be taken to a more in-depth description of the business and its offerings. The business that has registered on our website will add these posts. The organisation has the ability to add, edit, and delete posts in order to convey their most recent condition. Investors will be the primary beneficiaries of all the information in the post. As a result, a post's characteristics are created so that investors can benefit the most from it (elaborated in the next sections).

The system will send email notifications to investors on activities that they might find interesting, such as new companies of interest or founders requesting a meeting, in order to keep them informed and save them even more time. The list of posts in the feed can also be filtered using a filter feature based on a variety of different criteria, such as founded on, location, etc. According to the subscription model, the user will belong to a specific group, and as you move up the model, more features become accessible.

![Investable](https://media.giphy.com/media/wwLX1Us1lmwqMHPSWd/giphy.gif)

## Group Information

- _Group No_: 8
- _Date Created_: December 3, 2022
- _Website URL_: <https://bright-tiramisu-468dcf.netlify.app>
- _Git URL_: <https://git.cs.dal.ca/bhandari/ti-prototype-fall-2022/-/tree/main>

## Authors

- Aman Singh Bhandari
- Chanpreet Singh
- Dhairya Shah
- Divesh Totto
- Kalpit Machhi
- Yanfei Wang

## Technologies

| Front-end |                Back-end                | Database | Deployment |
| :-------: | :------------------------------------: | :------: | :--------: |
|  ReactJS  | AWS<br/>(Cognito, Lambda, API Gateway) | MongoDB  |  Netlify   |

## Features

1. Login and Registration
2. Post Management
3. Profile Management
4. Filter
5. Activity Feed
6. Notification
7. Connect with Founder

## Task Breakdown

|       Member        | <center>Tasks</center>                                             |
| :-----------------: | :----------------------------------------------------------------- |
| Aman Singh Bhandari | • Login and Registration UI <br/>• Post Management UI              |
|    Dhairya Shah     | • Activity Feed UI <br/>• Profile Management UI                    |
|    Kalpit Machhi    | • Post Management Backend <br/>• Filter APIs                       |
|   Chanpreet Singh   | • Login and Registration Backend <br/>• Profile Management Backend |
|     Yanfei Wang     | • Final Pitch PPT & Wireframe <br/>• Project Report Documentation  |
|    Divesh Totoo     | • Wireframes <br/>• Project Report Documentation                   |

## Detailed Instructions on How to Test the Prototype

- When a user visits the website, there are two options. Either register or log in. If a user is new to the system, they can register as an investor or an entrepreneur on the website. Once logged in, the system will direct the user to a different section based on the type of user.

  - To login as an <b>entrepreneur</b>, use the following credentials:
    - Email: khan.zannat@gmail.com
    - Password: 123456789
  - To login as an <b>investor</b>, use the following credentials:
    - Email: shah.dhairya@gmail.com
    - Password: 123456789

- The system will direct the user to a home page where he can view all the posts he has made for the investors if he is logged in as an entrepreneur.
- The entrepreneur can add a new post by selecting Create Post in the website's header. After clicking, the system will take the user to a page where they can create a post to show investors, add the company logo, and submit it.
- The user's main screen displays the posted statement after it has been submitted.
- The post can be edited or deleted by the user. The post will be deleted if the user chooses to delete it.
- If a user chooses to edit a post, he or she will be taken to a page where they can make changes to the fields they had previously filled out.
- Following editing, both investors and business owners will see the changes.
- Users who have logged in as investors will now be taken to the home page feed, where they will see all of the posts made by various entrepreneurs.
- The investor can exclude various entrepreneurs using various filters, such as start-ups that are woman-led, indigenous-led, or black-led start-ups.
- If a potential investor decides to view the entrepreneurs' details, the investor can click a different post to be taken to a different page where all of the entrepreneurs' details are displayed.
- There is an option for the investor to get in touch with the entrepreneur if they so choose.
- After clicking, a pre-written email that the investor can send to the entrepreneur to connect with them for additional conversation and potential collaboration will be opened.
- Entrepreneurs and investors can both log out of the system at any time.

## References

[1] “Cloud application platform,” Heroku.com. [Online]. Available: https://www.heroku.com/home. [Accessed: 04-Dec-2022].

[2] “React,” Reactjs.org. [Online]. Available: https://reactjs.org/. [Accessed: 04-Dec-2022].

[3] “Node.Js,” Node.js. [Online]. Available: https://nodejs.org/en/. [Accessed: 04-Dec-2022].

[4] “MUI: The React component library you always wanted,” Mui.com. [Online]. Available: https://mui.com/. [Accessed: 04-Dec-2022].

[5] “Home v6.4.4,” Reactrouter.com. [Online]. Available: https://reactrouter.com/en/main. [Accessed: 04-Dec-2022].

[6] “React-toastify,” Github.io. [Online]. Available: https://fkhadra.github.io/react-toastify/introduction/. [Accessed: 04-Dec-2022].

[7] “Autocomplete,” Mui.com. [Online]. Available: https://mui.com/material-ui/react-autocomplete/. [Accessed: 04-Dec-2022].

[8] “My application is not rendering a simple Tag in react js,” Stack Overflow. [Online]. Available: https://stackoverflow.com/questions/64283467/my-application-is-not-rendering-a-simple-h1-tag-in-react-js. [Accessed: 04-Dec-2022].

[9] “Menu,” Mui.com. [Online]. Available: https://mui.com/material-ui/react-menu/. [Accessed: 04-Dec-2022].

[10] Amazon.com. [Online]. Available: https://docs.aws.amazon.com/lambda/latest/dg/invocation-layers.html. [Accessed: 04-Dec-2022.

[11] Amazon.com. [Online]. Available: https://aws.amazon.com/lambda/. [Accessed: 04-Dec-2022].

[12] “PyMongo 4.3.3 documentation — PyMongo 4.3.3 documentation,” Readthedocs.io. [Online]. Available: https://pymongo.readthedocs.io/en/stable/. [Accessed: 04-Dec-2022].

[13] “Mongod,” Mongodb.com. [Online]. Available: https://www.mongodb.com/docs/manual/reference/program/mongod/. [Accessed: 04-Dec-2022].

[14] “MongoDB Atlas database,” MongoDB. [Online]. Available: https://www.mongodb.com/atlas/database. [Accessed: 04-Dec-2022].

[15] Amazon.com. [Online]. Available: https://aws.amazon.com/cognito/getting-started/. [Accessed: 04-Dec-2022].

[16] “CognitoIdentityProvider — Boto3 Docs 1.26.22 documentation,” Amazonaws.com. [Online]. Available: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/cognito-idp.html. [Accessed: 04-Dec-2022].

[17] “Pymongo,” PyPI. [Online]. Available: https://pypi.org/project/pymongo/. [Accessed: 04-Dec-2022].

[18] I. Aminu, “Building custom layers on AWS Lambda,” Towards Data Science, 13-Nov-2020. [Online]. Available: https://towardsdatascience.com/building-custom-layers-on-aws-lambda-35d17bd9abbb. [Accessed: 04-Dec-2022].

[19] R. Dutcosky, “Create your own Python Layer in AWS Lambda Environment,” plainenglish.io/blog/create-your-own-python-layer-on-aws-lambda-environment-2e5160b66f17, 09-Apr-2021. [Online]. Available: https://plainenglish.io/blog/create-your-own-python-layer-on-aws-lambda-environment-2e5160b66f17. [Accessed: 04-Dec-2022].

[20] Amazon.com. [Online]. Available: https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html. [Accessed: 04-Dec-2022].
