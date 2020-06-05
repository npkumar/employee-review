## employee-review

- Front-end: React JS
- Back-end: Express JS
- Database: Mongodb
- ODM Library: Mongoose
- Authentication: JWT

### Quick Setup

Application is currently deployed at https://employee-reviews.herokuapp.com/  (Free tiny instance, could be unstable)

For mongodb I've used a free instance from https://cloud.mongodb.com/

Ensure correct network access so that it is reachable (Note: 0.0.0.0/0 makes it accessable from everywhere)

Edit `default.json`
```
{
    "mongoURI": "<your mongodb URI path>",
    "jwtSecret": "<your JWT secret>"
}
```

Run `npm install` in both root folder and also `client`

Run `npm run dev` to start both server and client concurrently


### Common Views


| Menu                                                                                                                       | Register                                                                                                         | Home                                                                                                          | Login                                                                                                         |
|----------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| ![menu_without_login](https://user-images.githubusercontent.com/7235671/84093621-b717cb80-aa35-11ea-8220-be76ba9c6d63.png) | ![register](https://user-images.githubusercontent.com/7235671/84093623-b848f880-aa35-11ea-8dd2-d7b03fe5ce41.png) | ![login](https://user-images.githubusercontent.com/7235671/84093624-b8e18f00-aa35-11ea-8f7b-748457bed9f2.png) | ![login](https://user-images.githubusercontent.com/7235671/84093830-4ae99780-aa36-11ea-9c82-31c04d3195cd.png) |

- Any user can create an employee profile
- For sake of convenience one can register as an admin during registration

### Admin Views


| Dashboard                                                                                                         | Employees                                                                                                               | Review                                                                                                                   | Feedback                                                                                                                |
|-------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| ![dashboard](https://user-images.githubusercontent.com/7235671/84094129-feeb2280-aa36-11ea-80f6-f62c3bca459e.png) | ![employees_admin](https://user-images.githubusercontent.com/7235671/84094128-fe528c00-aa36-11ea-92df-31f0da9ef713.png) | ![review_employees](https://user-images.githubusercontent.com/7235671/84094121-fd215f00-aa36-11ea-9575-ad438ed03f1f.png) | ![feedback_review](https://user-images.githubusercontent.com/7235671/84094120-fc88c880-aa36-11ea-9def-308d4e6561e1.png) |


| Edit Review                                                                                                         | Edit Employee                                                                                                         | View Employee                                                                                                         | Menu after login                                                                                                         |
|---------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| ![edit_review](https://user-images.githubusercontent.com/7235671/84094119-fb579b80-aa36-11ea-8212-8f05b7cefece.png) | ![edit_employee](https://user-images.githubusercontent.com/7235671/84094124-fdb9f580-aa36-11ea-8f11-989df9380892.png) | ![view_employee](https://user-images.githubusercontent.com/7235671/84094126-fe528c00-aa36-11ea-8695-82f56b3d7071.png) | ![menu_after_login](https://user-images.githubusercontent.com/7235671/84094135-01e61300-aa37-11ea-8352-0ecf617dcf74.png) |

- Add a review and assgin to an individual user
- Can view, edit or delete a review
- Can leave a feedback and can delete any user's feedback

### Normal User View

| Dashboard                                                                                                                   | Employees                                                                                                                   | Review                                                                                                                        | Feedback                                                                                                                   |
|-----------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| ![non_admin_dashboard](https://user-images.githubusercontent.com/7235671/84093864-66ed3900-aa36-11ea-8e4c-77606ac5317a.png) | ![non_admin_employees](https://user-images.githubusercontent.com/7235671/84093867-681e6600-aa36-11ea-978c-58f6d79ec145.png) | ![non_admin_review_page](https://user-images.githubusercontent.com/7235671/84093872-694f9300-aa36-11ea-97fd-84caa7b3f45b.png) | ![non_admin_feedback](https://user-images.githubusercontent.com/7235671/84093871-68b6fc80-aa36-11ea-8673-9bc24b6e8469.png) |


- Cannot add review but only can view them
- Can add feedback and can only delete own feedback
- Can edit own employee profile and also delete
- TODO: Allow only reviews to assigned feedback



