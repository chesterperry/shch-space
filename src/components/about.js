import * as React from "react"
import LinkSimple from "./link.simple"

const About = () => (
  <div>

    <p>
      SHCH — продуктовая студия, которая проектирует и запускает онлайн-магазины и веб-сервисы.
    </p>
    <p>
      Более 10 лет в онлайн-ритейле. Работали с KIXBOX, Kin, Mizuno, Меч и Random Identities — знаем рынок изнутри, от витрины до дистрибьюции.
    </p>
    <p>
      Развиваем собственные инструменты для малого и среднего бизнеса:{" "}
    </p>
    <ul>
      <li>Поиск и персонализация</li>
      <li>Аналитика в рекламе и коммуникациях</li>
      <li>Программы лояльности</li>
    </ul>
    <p>
      Связаться {" "}
      <LinkSimple to="mailto:goto@shch.one">goto@shch.one</LinkSimple>{" "}
      или <LinkSimple to="https://t.me/olegscherbinin">Telegram</LinkSimple>
    </p>
  </div>
)

export default About
