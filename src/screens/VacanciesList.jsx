import React, { useState, useEffect } from 'react'
import moment from 'moment'
// import logo from '../лого.png'

const VacanciesList = () => {
  const [vacancies, setvacancies] = useState()
  const [search, setsearch] = useState("")

  useEffect(() => {
    const init = async () => {
      const f = await fetch(window.URL+"get_all_vacancy")
      const result = await f.json()
      if(!result.messageError){
        setvacancies(result)
      }
    }
    init()
  }, [])

  return (
    <div>
       <div className="content">
        <div className="page-header">
          <div className="container">
            <div className="page-header__content">
              <div className="page-header__text">
                <h1 className="page-header__title">Вакансии</h1>
                <div className="page-header__search">
                  <svg className="svg-icon search__icon">
                    <use fill="#ffffff" xlinkHref="#search-icon" />
                  </svg>
                  <input type="text" className="js-page-header__search" placeholder="Какую вакансию вы ищите"
                    onChange={(e) => setsearch(e.currentTarget.value.toLowerCase())}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="vacancy-wrap">
          <div className="container">
            <div className="vacancy-block">
              <div className="vacancy-block__sidebar">
                <ul className="vacancy-block__menu">
                  <li className="vacancy-block__menu-item vacancy-block__head-menu">
                    <div className="vacancy-block__menu-item__title">
                      Вакансии
                    </div>
                    <svg className="svg-icon vacancy-block__close js-vacancy-filter">
                      <use fill="#262c40" xlinkHref="#close-icon" />
                    </svg>
                  </li>
                  {
                    vacancies && (
                      <>
                        <li className="js-vacancy-section vacancy-block__menu-item vacancy-block__menu-item--active" data-url="/vacancy/">
                          <div className="vacancy-block__menu-item__text">Все</div>
                          <div className="vacancy-block__menu-item__count">{vacancies.length}</div>
                        </li>
                        {
                          countProfAree((vacancies.map((item) => 
                            item.professional_area
                          ))).map((item, index) =>
                            <li className="js-vacancy-section vacancy-block__menu-item" data-url="/vacancy/tag/7/" key={index}>
                              <div className="vacancy-block__menu-item__text">{item.name}</div>
                              <div className="vacancy-block__menu-item__count">{item.count}</div>
                            </li>
                          )
                        }
                      </>
                    )
                  }
                </ul>
              </div>
              <div className="vacancy-block__list">
                <div className="tag-filter">
                  <button className="tag-filter__close">
                    <svg className="svg-icon tag-filter__icon">
                      <use xlinkHref="#close-icon" />
                    </svg>
                  </button>
                  <div className="tag-filter__text">
                  </div>
                </div>
                <div className="vacancy-list">
                  {
                    vacancies && (
                      vacancies.filter((item) => 
                        item.professional_area.toLowerCase().indexOf(search) !== -1 ||
                        item.specialization.toLowerCase().indexOf(search) !== -1
                      ).map((item, index) => 
                        <div className="vacancy-list__item" key={index}>
                          <div className="vacancy-list__tag-wrap">
                            <div className="vacancy-list__tag tag js-vacancy-list-section" data-url="/vacancy/tag/1/">{item.professional_area}</div>
                          </div>
                          <a href="/" className="vacancy-list__link">{item.specialization}</a>
                          <div className="vacancy-date">{moment(new Date()).format("DD.MM.YYYY")}</div>
                        </div>
                      )
                    )
                  }
                </div>
                <div className="vacancy-more">
                  <button className="vacancy-more__button white-button js-load-more-vacancy" data-param="PAGEN_1">
                    Еще вакансии
                  </button>
                </div>
                <div className="vacancy-block__filter-open--sticky">
                  <div className="vacancy-block__filter-open">
                    <svg className="svg-icon vacancy-block__filter-icon">
                      <use fill="#ffffff" xlinkHref="#filter-icon" />
                    </svg>
                    <button className="blue-button js-vacancy-filter">Фильтр</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const countProfAree = (array_elements) => {
  array_elements.sort();
  var current = null;
  var cnt = 0;
  const res = []
  for (var i = 0; i < array_elements.length; i++) {
    if (array_elements[i] !== current) {
      if (cnt > 0) {
        res.push({
          name: current,
          count: cnt
        })
      }
      current = array_elements[i];
      cnt = 1;
    } else {
      cnt++;
    }
  }
  if (cnt > 0) {
    res.push({
      name: current,
      count: cnt
    })
  }
  return res
}


export default VacanciesList