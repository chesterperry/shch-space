import * as React from "react"
import LinkSimple from "./link.simple"

const About = () => (
  <p>
    Щербинин Олег — веб-разработчик из Москвы.
    Более 10 лет опыта в маркетинге и проект-менеджменте. Участвовал в развитии таких магазинов, как KIXBOX, Fred Perry и скейт-шоп "ОКТЯБРЬ". Сейчас занимаюсь веб-проектами и открыт для новых вызовов в областях онлайн-ритейла, аналитики и процедурной графики. Вы можете связаться со мной по
    почте{" "}
    <LinkSimple to="mailto:oleg@shch.one">oleg@shch.one</LinkSimple>{" "}
    и в <LinkSimple to="https://t.me/olegscherbinin">Telegram</LinkSimple>
  </p>
)

export default About
