**Endpoint:** `/surveys`

## admin

### 1. Получить все опросы

**Метод:** GET `/admin`
**Описание:** Получить все опросы.
**Guards:** AdminGuard

**Ответ:**

```json
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

### 2. Создать опрос
**Метод:** POST /
**Описание:** Создать новый опрос.
**Guards:** AdminGuard

**Тело запроса:**
```json
{
    "title": "Название опроса",
    "description": "Описание опроса",
    "startDate": "2024-06-01T00:00:00Z",
    "expirationDate": "2024-06-30T00:00:00Z"
}

**Ответ:**
```json
{
    "id": 1,
    "title": "Название опроса",
    "description": "Описание опроса",
    "startDate": "2024-06-01T00:00:00Z",
    "expirationDate": "2024-06-30T00:00:00Z"
}
###3. Создать вопросы для опроса
**Метод:** POST /:id/question
**Описание:** Добавить вопросы к опросу.
**Guards:** AdminGuard
**Тело запроса:**
```json
{
    "questions": [
        {
            "title": "Вопрос 1",
            "description": "Описание вопроса 1",
            "answerType": 1,
            "answerOptions": [
                {
                    "optionCount": 1,
                    "optionTitle": "Опция 1"
                }
            ],
            "maxAnswerCount": 1,
            "attachedImages": ["image1.png"]
        },
        ...
    ]
}

**Ответ:**
```json
true

###4. Обновить опрос
**Метод:** PATCH /:id**
**Описание:** Обновить существующий опрос.
**Guards:** AdminGuard

**Тело запроса:**
```json
{
    "title": "Обновленное название опроса",
    "description": "Обновленное описание опроса",
    "startDate": "2024-06-10T00:00:00Z",
    "expirationDate": "2024-07-10T00:00:00Z"
}

**Ответ:**
```json
{
    "id": 1,
    "title": "Обновленное название опроса",
    "description": "Обновленное описание опроса",
    "startDate": "2024-06-10T00:00:00Z",
    "expirationDate": "2024-07-10T00:00:00Z"
}

###5. Удалить опрос
**Метод:** DELETE /:id
**Описание:** Удалить опрос.
**Guards:** AdminGuard

Ответ:
```json
204 No Content

## user
###1. Получить опрос по ID
**Метод:** GET /:id
**Описание:** Получить опрос по его ID.
**Guards:** UserSurveyGuard

**Ответ:**
```json
{
    "id": 1,
    "title": "Опрос 1",
    "description": "Описание опроса 1",
    "startDate": "2024-06-01T00:00:00Z",
    "expirationDate": "2024-06-30T00:00:00Z"
}
###2. Получить опрос и вопросы по ID (Начать опрос)
**Метод:** GET /:id/start
**Описание:** Получить опрос и его вопросы по ID опроса.
**Guards:** UserSurveyGuard

**Ответ:**
```json
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
            "answerType": 1,
            "answerOptions": [
                {
                    "optionCount": 1,
                    "optionTitle": "Опция 1"
                }
            ],
            "maxAnswerCount": 1,
            "attachedImages": ["image1.png"]
        },
        ...
    ]
}

###3. Получить доступные опросы для пользователя
**Метод:** GET /
**Описание:** Получить опросы, доступные пользователю.

**Ответ:**
```json
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

###4. Ответить на вопросы опроса
**Метод:** POST /
**Описание:** Ответить на вопросы опроса.
**Guards:** UserSurveyGuard

**Тело запроса:**
```json
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

**Ответ:**
```json
true
````
