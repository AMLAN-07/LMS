# Faculty Project Guide: Online Library Management System

## 1. Project Overview

Online Library Management System ek full-stack web application hai jo college/school library ke daily work ko digital banata hai. Is project me admin books, students, categories, issue/return records, fines aur reports manage kar sakta hai. Student apna dashboard, available books, issued books aur fines dekh sakta hai.

Project ka main goal manual register-based library process ko ek simple, fast aur trackable web system me convert karna hai.

## 2. Problem Statement

Traditional library system me book issue, return, fine calculation aur student records manually maintain kiye jate hain. Isse duplicate entries, missing records, wrong fine calculation aur report generation me time lagta hai.

Ye project in problems ko solve karta hai:

- Student aur book records ko database me safely store karna.
- Book issue aur return process ko automate karna.
- Late return par fine calculate karna.
- Admin dashboard aur reports provide karna.
- Student ko self-service view dena jahan wo apni book/fine details dekh sake.

## 3. Main Objectives

- Admin ke liye complete library management panel banana.
- Student ke liye separate login-based dashboard banana.
- Book inventory ko category-wise manage karna.
- Issued books, returned books aur pending returns ka record maintain karna.
- Late return par fine generate karna.
- Reports aur dashboard statistics ke through faculty/admin ko quick overview dena.

## 4. Tech Stack

### Frontend

| Technology | Use |
| --- | --- |
| React 19 | User interface banane ke liye |
| Vite | Fast frontend development server/build tool |
| JavaScript | Frontend logic |
| Axios | Backend REST API calls |
| Tailwind CSS | Styling and responsive UI |
| LocalStorage | Logged-in user data temporarily store karne ke liye |

### Backend

| Technology | Use |
| --- | --- |
| Java 24 | Backend programming language |
| Spring Boot 4.1.0 | REST API application framework |
| Spring Web MVC | Controllers and API endpoints |
| Spring Data JPA | Database operations |
| Hibernate | ORM mapping |
| Jakarta Validation | Basic field validation |
| Lombok | Getter, setter, constructor boilerplate reduce karne ke liye |
| Springdoc OpenAPI | API documentation support |
| Maven | Dependency management and build |

### Database and Reports

| Technology | Use |
| --- | --- |
| MySQL | Main application database |
| H2 | Test database |
| Apache POI | Excel export/report support |
| iTextPDF | PDF report support |

## 5. Project Folder Structure

```text
LMS-main
|-- LibraryManagement
|   |-- pom.xml
|   |-- src/main/java/com/library/backends
|   |   |-- BackendsApplication.java
|   |   |-- controller
|   |   |-- dto
|   |   |-- entity
|   |   |-- exception
|   |   |-- mapper
|   |   |-- repository
|   |   |-- request
|   |   |-- service
|   |   `-- service/impl
|   `-- src/main/resources/application.properties
|
|-- lms-fronted
|   |-- package.json
|   |-- vite.config.js
|   `-- src
|       |-- App.jsx
|       |-- services
|       |-- constants
|       `-- components
|           |-- admin
|           |-- student
|           |-- auth
|           |-- common
|           `-- layout
|
`-- FACULTY_PROJECT_GUIDE.md
```

## 6. System Architecture

```text
User Browser
    |
    v
React Frontend
    |
    | Axios HTTP Requests
    v
Spring Boot REST API
    |
    v
Service Layer
    |
    v
JPA Repository Layer
    |
    v
MySQL Database
```

### Architecture Explanation

- Frontend React me bana hai aur user se input leta hai.
- Axios ke through frontend backend API ko request bhejta hai.
- Spring Boot controllers request receive karte hain.
- Service layer business logic handle karti hai, jaise issue book, return book, fine calculation.
- Repository layer database se data read/write karti hai.
- MySQL me final data tables ke form me store hota hai.

## 7. User Roles

### Admin

Admin complete system manage karta hai:

- Student add/update/delete
- Book add/update/delete
- Category add/update/delete
- Book issue
- Book return
- Fine management
- Reports and dashboard
- Admin profile

### Student

Student limited access rakhta hai:

- Login/register
- Apna dashboard dekhna
- Available books dekhna
- Apni issued/returned books dekhna
- Apne fines dekhna
- Profile details dekhna

## 8. Main Modules

### 8.1 Authentication Module

Files:

- Backend: `UserController.java`, `UserService.java`, `UserServiceImpl.java`, `User.java`
- Frontend: `AuthScreen.jsx`, `StudentService.js`

Features:

- User registration
- User login
- Role-based page selection: ADMIN or STUDENT
- Login ke baad user data browser localStorage me save hota hai.

Current login beginner-friendly token response use karta hai. Production me Spring Security + JWT + BCrypt recommended hai.

### 8.2 Student Management Module

Files:

- Backend: `StudentController.java`, `StudentService.java`, `StudentServiceImpl.java`, `Student.java`
- Frontend: `Students.jsx`, `StudentProfile.jsx`

Features:

- Add student
- View all students
- Update student
- Delete/disable student
- Email validation
- Roll number and organization details

### 8.3 Book Management Module

Files:

- Backend: `BookController.java`, `BookService.java`, `BookServiceImpl.java`, `Book.java`
- Frontend: `Books.jsx`, `StudentBooks.jsx`

Features:

- Add new book
- Update book details
- Delete book
- Track available copies
- Link book with category

### 8.4 Category Management Module

Files:

- Backend: `CategoryController.java`, `CategoryService.java`, `CategoryServiceImpl.java`, `Category.java`
- Frontend: `Categories.jsx`

Features:

- Add category
- Update category
- Delete category
- Category-wise book organization

### 8.5 Issue Book Module

Files:

- Backend: `LibraryTransactionController.java`, `LibraryTransactionServiceImpl.java`, `IssuedBook.java`
- Frontend: `IssueBook.jsx`

Features:

- Admin student aur book select karke book issue karta hai.
- Issue date store hoti hai.
- Due date store hoti hai.
- Book copy count reduce hota hai.
- Issue status initially `ISSUED` hota hai.

### 8.6 Return Book Module

Files:

- Backend: `LibraryTransactionController.java`, `ReturnedBook.java`
- Frontend: `ReturnBook.jsx`

Features:

- Admin pending issued book ko return mark karta hai.
- Return date save hoti hai.
- Book copy count increase hota hai.
- Late days calculate hote hain.
- Fine generate hota hai agar return late hai.

### 8.7 Fine Management Module

Files:

- Backend: `Fine.java`, `LibraryTransactionController.java`
- Frontend: `Fines.jsx`, `StudentFines.jsx`

Features:

- Late return par fine record create hota hai.
- Fine amount student-wise store hota hai.
- Admin fine ko `PAID` mark kar sakta hai.
- Student apne fines dekh sakta hai.

### 8.8 Dashboard and Reports Module

Files:

- Backend: `DashboardController.java`, `ReportController.java`
- Frontend: `AdminDashboard.jsx`, `StudentDashboard.jsx`, `Reports.jsx`

Features:

- Total students
- Active students
- Total books
- Available books
- Issued books
- Returned books
- Pending returns
- Total fines
- Overdue books report
- Student-book report
- Returned books report

## 9. Database Design

### Important Tables

| Table | Purpose |
| --- | --- |
| `users` | Login users and roles |
| `students` | Student profile and academic details |
| `categories` | Book categories |
| `books` | Book inventory |
| `issued_books` | Issued book transactions |
| `returned_books` | Returned book transactions |
| `fines` | Fine records |
| `notifications` | Student notification records |
| `audit_logs` | Activity log records |
| `book_issues` | Alternative issue tracking entity used by report/issue service |

### Entity Relationship Summary

```text
User 1 -> 1 Student
Category 1 -> Many Books
Student 1 -> Many IssuedBooks
Book 1 -> Many IssuedBooks
IssuedBook 1 -> 1 ReturnedBook
IssuedBook 1 -> 1 Fine
Student 1 -> Many Fines
Student 1 -> Many Notifications
```

## 10. Important API Endpoints

### Authentication

| Method | API | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | New user register |
| POST | `/api/auth/login` | User login |

### Students

| Method | API | Purpose |
| --- | --- | --- |
| GET | `/api/students` | All students |
| GET | `/api/students/{id}` | Single student |
| POST | `/api/students` | Add student |
| PUT | `/api/students/{id}` | Update student |
| DELETE | `/api/students/{id}` | Delete student |

### Books

| Method | API | Purpose |
| --- | --- | --- |
| GET | `/api/books` | All books |
| GET | `/api/books/{id}` | Single book |
| POST | `/api/books` | Add book |
| PUT | `/api/books/{id}` | Update book |
| DELETE | `/api/books/{id}` | Delete book |

### Categories

| Method | API | Purpose |
| --- | --- | --- |
| GET | `/api/categories` | All categories |
| POST | `/api/categories` | Add category |
| PUT | `/api/categories/{id}` | Update category |
| DELETE | `/api/categories/{id}` | Delete category |

### Library Transactions

| Method | API | Purpose |
| --- | --- | --- |
| GET | `/api/issues` | All issued books |
| POST | `/api/issues` | Issue a book |
| GET | `/api/returns` | All returned books |
| POST | `/api/returns/{issueId}` | Return a book |
| GET | `/api/fines` | All fines |
| PUT | `/api/fines/{fineId}/paid` | Mark fine as paid |

### Reports

| Method | API | Purpose |
| --- | --- | --- |
| GET | `/api/reports/overdue-books` | Overdue books report |
| GET | `/api/reports/student-books` | Student-book report |
| GET | `/api/reports/returned-books` | Returned books report |

## 11. Main Workflows

### Login Workflow

```text
User enters email/password
    -> React sends request to /api/auth/login
    -> Backend verifies user
    -> Success response returns role and token
    -> Frontend opens Admin or Student dashboard
```

### Book Issue Workflow

```text
Admin selects student and book
    -> Frontend sends issue request
    -> Backend checks book/student
    -> Issue record created
    -> Book copy count reduced
    -> Dashboard/report updated
```

### Book Return and Fine Workflow

```text
Admin selects issued book
    -> Backend marks book as returned
    -> Return date stored
    -> Book copy count increased
    -> Due date compared with return date
    -> If late, fine record generated
```

## 12. How to Run the Project

### Prerequisites

- Java 24
- Maven
- Node.js and npm
- MySQL Server

### Backend Setup

1. Create MySQL database:

```sql
CREATE DATABASE lms;
```

2. Update database username/password in:

```text
LibraryManagement/src/main/resources/application.properties
```

3. Run backend:

```bash
cd LibraryManagement
mvn spring-boot:run
```

Backend will run at:

```text
http://localhost:8080
```

### Frontend Setup

```bash
cd lms-fronted
npm install
npm run dev
```

Frontend usually runs at:

```text
http://localhost:5173
```

Note: Frontend API base URL is configured as `http://localhost:8080/api` in `lms-fronted/src/services/StudentService.js`.

## 13. Testing Approach

### Manual Testing

- Register user
- Login as admin/student
- Add student
- Add category
- Add book
- Issue book
- Return book
- Check fine generation
- Mark fine paid
- Check reports and dashboard

### Build Testing

Backend:

```bash
cd LibraryManagement
mvn test
```

Frontend:

```bash
cd lms-fronted
npm run build
```

## 14. Validation and Error Handling

Backend me validation ke liye Jakarta Validation use hua hai:

- Student first name required
- Student last name required
- Student email valid and required
- Book title required
- Book author required
- Book copies negative nahi ho sakti
- Category name required

Global exception handling ke liye `GlobalExceptionHandler.java` available hai. Resource not found cases ke liye `ResourcesNotFoundException.java` use hota hai.

## 15. Security Notes

Current version academic/demo purpose ke liye simple authentication use karta hai. Login successful hone par backend simple token return karta hai, aur frontend user details localStorage me save karta hai.

Production-ready version ke liye ye improvements recommended hain:

- Spring Security enable karna
- JWT authentication add karna
- Password hashing using BCrypt
- Role-based API authorization
- CORS ko specific frontend URL tak limit karna
- Database password environment variables se read karna

## 16. Important Code Files for Viva

| File | Why Important |
| --- | --- |
| `BackendsApplication.java` | Spring Boot application entry point |
| `Student.java` | Student table/entity design |
| `Book.java` | Book inventory entity |
| `IssuedBook.java` | Issue transaction entity |
| `ReturnedBook.java` | Return transaction entity |
| `Fine.java` | Fine record entity |
| `StudentController.java` | Student CRUD APIs |
| `BookController.java` | Book CRUD APIs |
| `LibraryTransactionController.java` | Issue, return and fine APIs |
| `StudentServiceImpl.java` | Student business logic |
| `LibraryTransactionServiceImpl.java` | Main issue/return/fine logic |
| `App.jsx` | Frontend routing and state management |
| `StudentService.js` | Axios API calls |

## 17. Viva Explanation Script

You can explain the project like this:

"This is an Online Library Management System built using React for frontend and Spring Boot for backend. The application has two main roles: Admin and Student. Admin can manage students, books, categories, issue books, return books, collect fines and view reports. Students can login and view their dashboard, issued books and fines. The frontend communicates with backend using Axios REST API calls. Backend follows layered architecture with Controller, Service, Repository and Entity layers. Data is stored in MySQL using Spring Data JPA and Hibernate. The project also includes validation, DTOs, exception handling and report-related modules."

## 18. Future Scope

- Add JWT-based secure login.
- Add password encryption.
- Add email/SMS notification for due dates.
- Add barcode/QR code support for books.
- Add advanced PDF/Excel export buttons in UI.
- Add librarian role separately from admin.
- Add search, filter and pagination on large data.
- Add book reservation/wishlist feature.
- Add deployment on cloud server.

## 19. Conclusion

Online Library Management System ek practical academic project hai jo real library ke important operations ko cover karta hai. Isme frontend, backend, database, REST API, validation, reports aur role-based UI jaise important software engineering concepts implement kiye gaye hain. Project faculty presentation ke liye suitable hai kyunki iska workflow clear hai, modules well-separated hain aur tech stack industry-oriented hai.
