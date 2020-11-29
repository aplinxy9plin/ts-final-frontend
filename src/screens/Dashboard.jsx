import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { Editor } from "react-draft-wysiwyg"
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

// icons
import alarm from '../icons/alarm.svg'
import messages from '../icons/messages.svg'
import avatar from '../icons/avatar.svg'
import blue_arrow_bottom from '../icons/blue_arrow_bottom.svg'
import home_active from '../icons/home_active.svg'
import user_inactive from '../icons/user_inactive.svg'
import bottom_arrow from '../icons/bottom_arrow.svg'
import checkbox_active from '../icons/checkbox_active.svg'

const Dashboard = () => {
  const [state, setstate] = useState(EditorState.createEmpty())
  const [data, setdata] = useState(null)
  const [vacancy, setvacancy] = useState({
    professional_area: "",
    specialization: "",
    level: "",
    text: "",
    special_advantages: ""
  })
  const [text, settext] = useState("")

  useEffect(() => {
    const init = async () => {
      var myHeaders = new Headers();
      myHeaders.append("UserToken", localStorage.getItem("UserToken"));

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const f = await fetch("http://178.205.101.202:81/get_directories_for_vacancies", requestOptions)
      const result = await f.json()
      if(!result.message && !result.messageError){
        setdata(result)
      }
    }
    init()
    // ContentState.createFromText("afasdfasdfa")
  }, [])

  const getText = (d) => {
    return `
      <h1>${d.professional_area}</h1><br /><br />
      <h2>${d.specialization}</h2><br /><br />
      <h4>${d.level}</h4><br /><br />
      <h2>Чем предстоит заниматься</h2><br />
      <p>${d.text}</p><br /><br />
      <h2>Мы предлагаем</h2><br />
      <p>${d.special_advantages}</p><br /><br />
    `
  }

  return (
    <div>
      <nav className="dash_nav">
        <div className="logo_container">
          <img alt="logo" />
          <h1 className="logo_title">HR<br />Менеджмент</h1>
        </div>
        <div className="right_nav">
          <div className="nav_icon"
            style={{
              borderLeft: "2px solid #F5F6F9"
            }}
          >
            <a href="#alarm">
              <img src={alarm} alt="alarm_icon" className="nav_icon_img" />
            </a>
          </div>
          <div className="nav_icon">
            <a href="#messages">
              <img src={messages} alt="messages_icon" className="nav_icon_img"/>
            </a>
          </div>
          <div className="nav_profile">
            <img src={avatar} alt="avatar" className="avatar_img" />
            <h4 className="profile_name">Павел Франк</h4>
            <img src={blue_arrow_bottom} alt="blue_arrow_bottom" className="blue_arrow_bottom" />
          </div>
        </div>
      </nav>
      <div className="side_bar">
        <div className="side_container">
          <div className="side_item side_active">
            <img src={home_active} alt="home" className="side_icon_active"/>
            <h4 className="side_active_text">
              Дашборд
            </h4>
          </div>
          <div className="side_item" onClick={() => {
            window.location.href = "/dash2"
          }}>
            <img src={user_inactive} alt="useer" className="side_icon"/>
            <h4 className="side_text">
              Согласование
            </h4>
          </div>
          <div className="side_item"
            onClick={() => {
              window.location.href = "/dash3"
            }}
          >
            <img src={user_inactive} alt="useer" className="side_icon"/>
            <h4 className="side_text">
              Список вакансий
            </h4>
          </div>
          <div className="side_item">
            <img src={user_inactive} alt="useer" className="side_icon"/>
            <h4 className="side_text">
              Тестовые задания
            </h4>
          </div>
          <div className="side_item"
            onClick={() => {
              window.location.href = "/users"
            }}
          >
            <img src={user_inactive} alt="useer" className="side_icon"/>
            <h4 className="side_text">
              Анализ кандидатов
            </h4>
          </div>
        </div>
      </div>
      <div className="dash_container">
        <div className="dash_left">
          {
            data && (
              <>
                <h1>Добавить вакансию</h1>
                <div className="add_vacancy_container">
                  <div className="dash_form">
                    <h3>Профессиональная область</h3>
                    <div className="dash_select_container">
                      <select className="dash_select" placeholder="Разработка"
                      onChange={(e) => {
                        const tmp = vacancy
                        tmp.professional_area = e.currentTarget.value
                        settext(tmp)
                        const blocksFromHTML = convertFromHTML(
                          getText(tmp)
                        )
                        const st = ContentState.createFromBlockArray(
                          blocksFromHTML.contentBlocks,
                          blocksFromHTML.entityMap,
                        );
                        setstate(EditorState.createWithContent(st))
                      }}
                      >
                        {
                          data.professional_area && (
                            data.professional_area.map((item) => 
                              <option value={item.title}>{item.title}</option>
                            )
                          )
                        }
                      </select>
                      <a href="#add" className="dash_add">Добавить</a>
                    </div>
                  </div>
                  <div className="dash_form">
                    <h3>Специализация</h3>
                    <div className="dash_select_container">
                      <select className="dash_select" placeholder="Разработка"
                        disabled={!vacancy.professional_area}
                        onChange={(e) => {
                          const tmp = vacancy
                          tmp.specialization = e.currentTarget.value
                          settext(tmp)
                          const blocksFromHTML = convertFromHTML(
                            getText(tmp)
                          )
                          const st = ContentState.createFromBlockArray(
                            blocksFromHTML.contentBlocks,
                            blocksFromHTML.entityMap,
                          );
                          setstate(EditorState.createWithContent(st))
                        }}
                      >
                        <option disabled selected value> -- Выбрать -- </option>
                        {
                          (vacancy.professional_area) && (
                            data.professional_area
                            .filter((item) => item.title === vacancy.professional_area)[0].specializations
                            .map((item) => 
                              <option value={item.title}>{item.title}</option>
                            )
                          )
                        }
                      </select>
                      <a href="#add" className="dash_add">Добавить</a>
                    </div>
                  </div>
                  <div className="dash_form">
                    <h3>Уровень специалиста</h3>
                    <div className="dash_select_container">
                      <select className="dash_select" placeholder="Разработка"
                      onChange={(e) => {
                        const tmp = vacancy
                        tmp.level = e.currentTarget.value
                        settext(tmp)
                        const blocksFromHTML = convertFromHTML(
                          getText(tmp)
                        )
                        const st = ContentState.createFromBlockArray(
                          blocksFromHTML.contentBlocks,
                          blocksFromHTML.entityMap,
                        );
                        setstate(EditorState.createWithContent(st))
                      }}
                      >
                        <option disabled selected value> -- Выбрать -- </option>
                        {
                          data.grade && (
                            data.grade.map((item) => 
                              <option value={item[1]}>{item[1]}</option>
                            )
                          )
                        }
                      </select>
                      <a href="#add" className="dash_add">Добавить</a>
                    </div>
                  </div>
                  <div className="dash_form">
                    <h3>Чем предстоит заниматься</h3>
                    <div className="dash_select_container">
                      <div className="dash_text">
                        <textarea className="dash_text_text" style={{
                          border: "none",
                          width: "90%",
                          resize: "none"
                        }}
                        onChange={(e) => {
                          const tmp = vacancy
                          tmp.text = e.currentTarget.value.split("\n").join("<br />")
                          settext(tmp)
                          const blocksFromHTML = convertFromHTML(
                            getText(tmp)
                          )
                          const st = ContentState.createFromBlockArray(
                            blocksFromHTML.contentBlocks,
                            blocksFromHTML.entityMap,
                          );
                          setstate(EditorState.createWithContent(st))
                        }}
                        />
                        {/* <p className="dash_text_text">
                          Принимать участие в объединении услуг портфельных компаний в единую B2C платформу
                        </p> */}
                      </div>
                    </div>
                  </div>
                  <div className="dash_form">
                    <h3>Ключевые требования</h3>
                    <div className="dash_select_container">
                      <p className="dash_simple_text">
                        Технологии и инструменты
                      </p>
                    </div>
                    <a href="#add" className="dash_add_btn">
                      Добавить
                    </a>
                  </div>
                  <div className="dash_form"
                    style={{ marginTop: 20 }}
                  >
                    <div className="dash_select_container">
                      <p className="dash_simple_text">
                        Навыки
                      </p>
                    </div>
                    <a href="#add" className="dash_add_btn"
                      style={{ top: 0 }}
                    >
                      Добавить
                    </a>
                  </div>
                  <div className="dash_form">
                    <h3>Дополнительные требования</h3>
                    <div className="dash_select_container">
                      <p className="dash_simple_text">
                        Технологии и инструменты
                      </p>
                    </div>
                    <a href="#add" className="dash_add_btn">
                      Добавить
                    </a>
                  </div>
                  <div className="checkbox">
                    <img src={checkbox_active} alt="checkbox_active" className="checkbox_icon" />
                    <p
                      style={{
                        marginLeft: 10
                      }}
                    >Тестовое задание</p>
                  </div>
                  <div className="dash_form">
                    <h3>Мы предлагаем</h3>
                    <div className="dash_select_container">
                      <select className="dash_select" placeholder="Разработка"
                      onChange={(e) => {
                        const tmp = vacancy
                        tmp.special_advantages = e.currentTarget.value
                        settext(tmp)
                        const blocksFromHTML = convertFromHTML(
                          getText(tmp)
                        )
                        const st = ContentState.createFromBlockArray(
                          blocksFromHTML.contentBlocks,
                          blocksFromHTML.entityMap,
                        );
                        setstate(EditorState.createWithContent(st))
                      }}
                      >
                        <option disabled selected value> -- Выбрать -- </option>
                        {
                          data.special_advantages && (
                            data.special_advantages.map((item) => 
                              <option value={item[1]}>{item[1]}</option>
                            )
                          )
                        }
                      </select>
                      <a href="#add" className="dash_add">Добавить</a>
                    </div>
                  </div>
               </div>
              </>
            )
          }
        </div>
        <div>
        <Editor
          readOnly={!(
            vacancy.professional_area &&
            vacancy.special_advantages &&
            vacancy.specialization &&
            vacancy.text &&
            vacancy.level
          )}
          editorState={state}
          onEditorStateChange={(newState) => {
            console.log(newState._immutable.getCurrentContent)
            setstate(newState)
          }}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
        />
            <div className="dash_right1">
              {/* <textarea className="dash_textarea" 
                value={`Go разработчик

                Стратегически важные и новые для Банка направления деятельности - розничный бизнес и развитие цифровых технологий. В рамках нового финтех проекта мы ищем Разработчиков Golang
                
                Чем предстоит заниматься:
                
                Принимать участие в объединении услуг портфельных компаний в единую B2C платформу
                
                Ключевые требования:
                
                Владеет опытом промышленной разработки на Go от двух лет, профилирования и отладки Go кода, написания сетевых многопоточных приложений
                Использует Protobuf/gRPC/OpenAP, умеет Tarantool/Redis/Clickhouse, Git-Flow
                
                Мы предлагаем:
                
                Возможности профессионального и карьерного роста в амбициозном цифровом проекте, интересные задачи и решения
                Отпуск 33 дня (28 дней + 5 дополнительно к основному отпуску) + ежегодная стимулирующая выплата к отпуску
                Офис в центре Москвы, возможность удаленной работы`}
              /> */}
              </div>
              <div className="save_btn"
                style={{
                  marginTop: "50%",
                  width: "auto"
                }}
              >
                <a href="#save" className="save_btn_a">
                  Создать вакансию и отправить на согласование
                </a>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Dashboard
