import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"
import LayoutGrid from "../components/layoutGrid"

const shortcodes = { Link } // Provide common components here

export default function PageTemplate({ data, children }) {
  return (
    <LayoutGrid>
      <div className="draw-grid-40 min-h-fit w-screen flex justify-center">
        <div className="p-2.5 md:p-10 w-full md:max-w-2xl">
          <div className="grid w-full  md:grid-cols-2 grid-cols-1 flex-none">
            <div className="h-60 md:col-span-2 col-span-1 ">
              <h3 className="h-16">
                <Link className=" no-underline hover:underline" to="/">
                  INDEX ←
                </Link>
              </h3>

              <h1 className="h-32">ОБО МНЕ</h1>
            </div>
            <div className="flex col-span-1 md:col-span-2 flex-col">
              <p>
                Москвич, 36 лет, живу в Замоскворечье,
                образование инженер радиосистем в МАИ, последние 7 лет работаю в KIXBOX менеджером
                проектов различного профиля.
              </p>
              <p>
                Примеры проектов: <Link to='/projects/october-skateshop-2018/'>скетйшоп Октябрь</Link> на Новом Арбате и одноименный <Link to='/projects/october-online-store-2020/'>интернет-магазин</Link>,
                мероприятия SM <Link to='/projects/sm-bread-2019/'>Хлебзавод</Link> и <Link to='/projects/sm-white-workshop-2019/'>Цех Белого</Link>, вечеринки с <Link to='/projects/fred-perry-x-dolphin-2018/'>диджей-сетами Дельфина</Link>, <Link to='/projects/fred-perry-aviapark-2016/'>магазин Fred Perry</Link> в Москве.
              </p>
              <p>
                Cвободное время провожу с семьей, занимаюсь шоссейным велоспортом, программирую
                на JS, веду заметки о дизайне, искусстве и технологиях.
              </p>
            </div>
          </div>
        </div>
      </div>
    </LayoutGrid>
  )
}
