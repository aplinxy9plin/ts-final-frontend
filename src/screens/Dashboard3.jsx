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
  const [vacancies, setvacancies] = useState(
    [
      {
          "dt": 1606435200.0,
          "id": 20,
          "professional_area": "Разработка",
          "specialization": "Веб-разработчик"
      }
    ]
  )
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

      const f = await fetch("http://178.205.101.202:81/get_all_vacancy")
      const result = await f.json()
      if(!result.message && !result.messageError){
        setvacancies(result)
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
          <div className="side_item"
            onClick={() => {
              window.location.href = "/dashboard"
            }}
          >
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
          <div className="side_item side_active"
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
      <div className="dash_container_full">
        {
            vacancies && (
              vacancies.map((item) => 
                <div className="block12">
                  <h3 className="block_title">{item.specialization}</h3>
                  <a
                    className="block_link"
                    href="#valid"
                    onClick={(e) => {
                      window.location.href = "/dash2"
                      // const blocksFromHTML = convertFromHTML(
                      //   getText({
                      //     professional_area: item.professional_area,
                      //     specialization: item.specialization
                      //   })
                      // )
                      // const st = ContentState.createFromBlockArray(
                      //   blocksFromHTML.contentBlocks,
                      //   blocksFromHTML.entityMap,
                      // );
                      // setstate(EditorState.createWithContent(st))
                    }}
                  >
                    Проверить
                  </a>
                </div>
              )
            )
          }
        {/* <div>
              <div className="save_btn"
                style={{
                  marginTop: "50%",
                  width: "auto"
                }}
              >
                <a href="#save" className="save_btn_a">
                  Опубликовать
                </a>
            </div>
          </div> */}
        </div>
    </div>
  )
}

export default Dashboard
