import * as React from "react"
import LinkSimple from "./link.simple"

const About = () => (
  <p>
    Занимаюсь проектами в моде более 10 лет. Вы можете связаться со мной по
    почте{" "}
    <LinkSimple to="mailto:oleg.shch@gmail.com">oleg.shch@gmail.com</LinkSimple>{" "}
    или в <LinkSimple to="https://t.me/olegscherbinin">Telegram</LinkSimple>
  </p>
)

export default About
