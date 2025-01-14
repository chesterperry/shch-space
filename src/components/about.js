import * as React from "react"
import LinkSimple from "./link.simple"

const About = () => (
  <p>
    Более 10 лет в маркетинге и проект-менеджменте. Работал над магазинами KIXBOX, Fred Perry и скейт-шопом ОКТЯБРЬ. Сейчас развиваю веб-проекты. Открыт для задач в процедурной графике, аналитике и онлайн-ритейле. Вы можете связаться со мной по
    почте{" "}
    <LinkSimple to="mailto:oleg@shch.one">oleg@shch.one</LinkSimple>{" "}
    и в <LinkSimple to="https://t.me/olegscherbinin">Telegram</LinkSimple>
  </p>
)

export default About
