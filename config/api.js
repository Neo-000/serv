export const api = {
    "/order":{
        "/create":{
            http:"post",
            title:"создание заказа",
            shema:{
                title:"Наименование заказа",
                object:"Описание обьекта для работ",
                name:"Имя заказчика",
                firstname:"Отчетство",
                surname:"Фамилия",
                phone:"Номер телефона",
                price:"Сумма за заказ",
                date:"дата создания",
                msg:"Доп информация"
            }
        },
        "/all":{
            http:"post",
            title:"получение всех заказов",
            shema:{
                "Нет необходимости передавать данные":true
            }
        },
        "/delete":{
            http:"post",
            title:"удаление заказов по id",
            shema:{
                _id:"id Заказа"
            }
        },
        "/delete_all":{
            http:"",
            title:"",
            shema:{
                "Нет необходимости передавать данные":true
            }
        }
    },
    "/bid":{
        "/create":{
            http:"post",
            title:"создание заявки",
            shema:{
                name:"Имя заказчика",
                firstname:"Отчетство",
                surname:"Фамилия",
                phone:"Номер телефона",
                date:"дата создания",
                msg:"Доп информация"
            }
        }
    },

    "/services":{
        "/add":{
            http:"post",
            title:"Добавить услугу",
            shema:{
                _id:"id генерируется автоматически",
                category_id:"id категории",
                name:"имя услуги",
                price:"цена за услугу"
                }   
            },
        "/update":{
            http:"post",
            title:"изменить имя и цену услуги",
            shema:{
                _id:"id услуги",
                name:"новое имя услуги",
                price:"новая цена за услугу"
                }   
            },
        "/update/category":{
            http:"post",
            title:"изменить связанную категорию",
            shema:{
                _id:"id услуги",
                category_id:"id новой категории"
                }   
            },
        "/delete":{
            http:"post",
            title:"Удалить услугу",
            shema:{
                _id:"id услуги"
                }   
            },
        "/getall":{
            http:"get",
            title:"Получить все услуги" 
            },
    },
    "/category":{
        "/add":{
            http:"post",
            title:"Создание категории",
            shema:{
                _id:"Генерируется автоматически",
                name:"Имя категории",
                services:"Создается пустой массив для услуг",
                subcategory:"Создается пустой массив для подкатегорий"
            }
        },
        "/update":{
            http:"post",
            title:"Изменение имени категории",
            shema:{
                _id:"id категориии",
                name:"Новое имя категории"
            }
        },
        "/delete":{
            http:"post",
            title:"Удаление категории и всех услуг",
            shema:{
                _id:"id категориии"
            }
        },
        "/getname":{
            http:"post",
            title:"Возвращает имя категории",
            shema:{
                _id:"id категории"
            }
        },
        "/getservices":{
            http:"post",
            title:"Возвращает id услуг в этой категории",
            shema:{
                _id:"id категории"
            }
        },
        "/getall":{
            http:"get",
            title:"Возвращает все категории и их колличество",
            shema:{
                _id:"id категории"
            }
        }
    }
}