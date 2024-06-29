# admin

## **Endpoint:** `/surveys`

### 1. Получить все опросы

**Метод:** GET `/admin`

**Описание:** Получить все опросы.

**Guards:** AdminGuard

**Ответ:**

```ts
[
    {
        "id": 1,
        "title": "Опрос 1",
        "description": "Описание опроса 1",
        "startDate": "2024-06-01T00:00:00Z",
        "expirationDate": "2024-06-30T00:00:00Z"
    },
    ...
]
```

### 2. Создать опрос

**Метод:** POST /

**Описание:** Создать новый опрос.

**Guards:** AdminGuard

**Тело запроса:**

```ts
{
    "title": "Название опроса",
    "description": "Описание опроса",
    "startDate": "2024-06-01T00:00:00Z",
    "expirationDate": "2024-06-30T00:00:00Z"
}
```

**Ответ:**

```ts
{
    "id": 1,
    "title": "Название опроса",
    "description": "Описание опроса",
    "startDate": "2024-06-01T00:00:00Z",
    "expirationDate": "2024-06-30T00:00:00Z"
}
```

### 3. Создать вопросы для опроса

**Метод:** POST /:id/question

**Описание:** Добавить вопросы к опросу.

**Guards:** AdminGuard

**Тело запроса:**

```ts
{
    "questions": [
        {
            "title": "Вопрос 1",
            "description": "Описание вопроса 1",
            "questionType": 1,
            "questionOptions": [
                {
                    "optionCount": 1,
                    "optionTitle": "Ответ 1"
                }
            ],
            "maxAnswerCount": 1,
            "attachedImages": ["image1.png"]
        },
        ...
    ]
}
```

**Ответ:**

```ts
true;
```

### 4. Обновить опрос

**Метод:** PATCH /:id

**Описание:** Обновить существующий опрос.

**Guards:** AdminGuard

**Тело запроса:**

```ts
{
    "title": "Обновленное название опроса",
    "description": "Обновленное описание опроса",
    "startDate": "2024-06-10T00:00:00Z",
    "expirationDate": "2024-07-10T00:00:00Z"
}
```

**Ответ:**

```ts
{
    "id": 1,
    "title": "Обновленное название опроса",
    "description": "Обновленное описание опроса",
    "startDate": "2024-06-10T00:00:00Z",
    "expirationDate": "2024-07-10T00:00:00Z"
}
```

### 5. Удалить опрос

**Метод:** DELETE /:id

**Описание:** Удалить опрос.

**Guards:** AdminGuard

Ответ:

```ts
204 No Content
```

## Endpoint: `/facultyDepartment`

### 1. Получить факультет/направление по ID

**Метод:** GET `/:id`

**Описание:** Получить информацию о кафедре или факультете по его ID.

**Guards:** AdminGuard

**Ответ:**

```ts
{
    "id": 1,
    "faculty": "Механико-математический факультет",
    "department": "Прикладная математика и информатика"
}
```

### 2. Создать факультет/направление

**Метод:** POST /

**Описание:** Создать новый факультет/направление.

**Guards:** AdminGuard

**Тело запроса:**

```ts
{
    "faculty": "Механико-математический факультет",
    "department": "Прикладная математика и информатика"
}
```

**Ответ:**

```ts
{
    "id": 1,
    "faculty": "Механико-математический факультет",
    "department": "Прикладная математика и информатика"
}
```

### 3. Обновить факультет/направление

**Метод:** PATCH /:id

**Описание:** Обновить данные существующего факультета/направления.

**Guards:** AdminGuard

**Тело запроса:**

```ts
{
    "faculty": "Физико-математический факультет",
    "department": "Прикладная математика и информатика"
}
```

**Ответ:**

```ts
[
  1,
  [
    {
      id: 1,
      faculty: 'Физико-математический факультет',
      department: 'Прикладная математика и информатика',
    },
  ],
];
```

### 4. Удалить кафедру/факультет

**Метод:** DELETE /:id

**Описание:** Удалить кафедру или факультет.

**Guards:** AdminGuard

**Ответ:**

```ts
204 No Content
```
## **Endpoint:** '/images'
### 1. Загрузить изображение
**Метод:** POST /:id(surveyId)

**Описание:** Загрузить изображение в вопрос.

**Guards:** AdminGuard

**Тело запроса:**
```ts
{
    @UploadedFile() file
}
```


## **Endpoint:** '/images'

### 1. Загрузить изображение

**Метод:** POST /:id(surveyId)

**Описание:** Загрузить изображение в вопрос.

**Guards:** AdminGuard

**Тело запроса:**

```ts
{
    @UploadedFile() file
}
```

# user

## **Endpoint:** `/surveys`

### 1. Получить опрос по ID

**Метод:** GET /:id

**Описание:** Получить опрос по его ID.

**Guards:** UserSurveyGuard

**Ответ:**

```ts
{
    "id": 1,
    "title": "Опрос 1",
    "description": "Описание опроса 1",
    "startDate": "2024-06-01T00:00:00Z",
    "expirationDate": "2024-06-30T00:00:00Z"
}
```

### 2. Получить опрос и вопросы по ID (Начать опрос)

**Метод:** GET /:id/start

**Описание:** Получить опрос и его вопросы по ID опроса.

**Guards:** UserSurveyGuard

**Ответ:**

```ts
{
    "survey": {
        "id": 1,
        "title": "Опрос 1",
        "description": "Описание опроса 1",
        "startDate": "2024-06-01T00:00:00Z",
        "expirationDate": "2024-06-30T00:00:00Z"
    },
    "questions": [
        {
            "id": 1,
            "title": "Вопрос 1",
            "description": "Описание вопроса 1",
            "questionType": 1,
            "questionOptions": [
                {
                    "optionCount": 1,
                    "optionTitle": "Ответ 1"
                }
            ],
            "maxAnswerCount": 1,
            "attachedImages": ["uploads/image1.png"]
        },
        ...
    ]
}
```

### 3. Получить доступные опросы для пользователя

**Метод:** GET /

**Описание:** Получить опросы, доступные пользователю.

**Ответ:**

```ts
[
    {
        "id": 1,
        "title": "Опрос 1",
        "description": "Описание опроса 1",
        "startDate": "2024-06-01T00:00:00Z",
        "expirationDate": "2024-06-30T00:00:00Z"
    },
    ...
]
```

### 4. Ответить на вопросы опроса

**Метод:** POST /

**Описание:** Ответить на вопросы опроса.

**Guards:** UserSurveyGuard

**Тело запроса:**

```ts
{
    "surveyId": 1,
    "answers": [
        {
            "questionId": 1,
            "answer": "Ответ на вопрос 1"
        },
        ...
    ]
}
```

**Ответ:**

```ts
true;
```

## Endpoint: `/users`

### 1. Получить пользователя по ID

**Метод:** GET `/:id`

**Описание:** Получить пользователя по его ID.

**Guards:** UserProfileGuard

**Ответ:**

```ts
{
    "id": 1,
    "email": "example@example.com",
    "firstname": "Имя",
    "lastname": "Фамилия",
    "sex": 1,
    "birthdate": "1990-01-01T00:00:00Z",
    "admin": false,
    "lastlogin": "2024-06-01T00:00:00Z",
    "facultyDepartmentId": 1,
    "createdAt": "2024-06-01T00:00:00Z",
    "updatedAt": "2024-06-01T00:00:00Z"
}
```

### 2. Создать пользователя (PUBLIC)

**Метод:** POST /

**Описание:** Создать нового пользователя.

**Guards:** Public

**Тело запроса:**

```ts
{
    "email": "example@example.com",
    "password": "password123",
    "firstname": "Имя",
    "lastname": "Фамилия",
    "sex": 1,
    "birthdate": "1990-01-01T00:00:00Z",
    "facultyDepartmentId": 1
}
```

**Ответ:**

```ts
{
    "id": 1,
    "email": "example@example.com",
    "firstname": "Имя",
    "lastname": "Фамилия",
    "sex": 1,
    "birthdate": "1990-01-01T00:00:00Z",
    "admin": false,
    "lastlogin": "2024-06-01T00:00:00Z",
    "facultyDepartmentId": 1,
    "createdAt": "2024-06-01T00:00:00Z",
    "updatedAt": "2024-06-01T00:00:00Z"
}
```

### 3. Обновить пользователя

**Метод:** PATCH /:id

**Описание:** Обновить данные существующего пользователя.

**Guards:** UserProfileGuard

**Тело запроса:**

```ts
{
    "email": "newemail@example.com",
    "password": "newpassword123",
    "firstname": "Новое имя",
    "lastname": "Новая фамилия",
    "sex": 2,
    "birthdate": "1995-01-01T00:00:00Z",
    "admin": true,
    "lastlogin": "2024-06-01T00:00:00Z"
}
```

**Ответ:**

```ts
[
  1,
  [
    {
      id: 1,
      email: 'newemail@example.com',
      firstname: 'Новое имя',
      lastname: 'Новая фамилия',
      sex: 2,
      birthdate: '1995-01-01T00:00:00Z',
      admin: true,
      lastlogin: '2024-06-01T00:00:00Z',
      facultyDepartmentId: 1,
      createdAt: '2024-06-01T00:00:00Z',
      updatedAt: '2024-06-01T00:00:00Z',
    },
  ],
];
```

### 4. Удалить пользователя

**Метод:** DELETE /:id

**Описание:** Удалить пользователя.

**Guards:** UserProfileGuard

**Ответ:**

```ts
204 No Content
```

## Endpoint: `/auth`

### 1. Вход в систему (PUBLIC)

**Метод:** POST `/login`

**Описание:** Аутентификация пользователя по электронной почте и паролю.

**Тело запроса:**

```ts
{
    "email": "user@example.com",
    "password": "userpassword"
}
```

**Ответ:**

```ts
{
    "access_token": "jwt_token"
}
```

### 2. Получение профиля пользователя

**Метод:** GET /profile

**Описание:** Получение данных профиля аутентифицированного пользователя.

**Guards:** AuthGuard

**Ответ:**

```ts
{
    "id": 1,
    "email": "user@example.com",
    "faculty": 1,
    "isAdmin": false
}
```
## **Endpoint:** '/images'
### 1. Получить изображение
**Метод:** GET /:id(surveyId)/:filename

**Описание:** Получить изображение в вопросе.

**Guards:** UserSurveyGuard

**Тело запроса:**
...

## **Endpoint:** '/images'

### 1. Получить изображение

**Метод:** GET /:id(surveyId)/:filename

**Описание:** Получить изображение в вопросе.

**Guards:** UserSurveyGuard

**Тело запроса:**
...

# Guards

## AuthGuard

**Описание:** Используется по умолчанию, проверяет аутентификацию пользователя (jwt_token).

## AdminGuard

**Описание:** Предоставляет доступ только администраторам (isAdmin).

## UserSurveyGuard

**Описание:** Предоставляет доступ к опросам только пользователям, имеющим разрешение (по id или facultyDepartmentId).

## UserProfileGuard

**Описание:** Предоставляет доступ к профилю пользователя только самому пользователю (id).

# Enums
<<<<<<< HEAD

## QuestionTypeEnum (типы ответов)

=======
## QuestionTypeEnum (типы ответов)
>>>>>>> b85ab845b4ca9d122e11642f84b443a00c335a31
```ts
}
  'Текст' = 0,
  'Один из списка' = 1,
  'Несколько из списка' = 2,
  'Файл' = 3,
}
```

## UserSexEnum (пол пользователя)

```ts
}
  'Мужской' = 0,
  'Женский' = 1,
}
```
