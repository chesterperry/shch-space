import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const SecondPage = () => (
  <Layout>
    <div className="after:content-[''] after:clear-both after:block">
      <h1>Hi from the second page</h1>
      <img
          className="float-left h-8 w-auto transition-all delay-150 ease-in-out hover:h-48 m-2"
          src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=320&q=80"
        /><p>
        Sed auctor cursus massa at porta. Integer ligula ipsum, tristique sit
        amet orci vel, viverra egestas ligula.

        Curabitur vehicula tellus neque, ac ornare ex malesuada et. In vitae
        convallis lacus. Aliquam erat volutpat. Suspendisse ac imperdiet turpis.
        <img
          className="float-left h-8 w-auto transition-all delay-150 ease-in-out hover:h-48 m-2"
          src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=320&q=80"
        />Aenean finibus sollicitudin eros pharetra congue. Duis ornare egestas
        augue ut luctus. Proin blandit quam nec lacus varius commodo et a urna.
        Ut id ornare felis, eget fermentum sapien.
      </p>

      <p>
        Nam vulputate diam nec tempor bibendum. Donec luctus augue eget
        malesuada ultrices. Phasellus turpis est, posuere sit amet dapibus ut,
        facilisis sed est. Nam id risus quis ante semper consectetur eget
        aliquam lorem. Vivamus tristique elit dolor, sed pretium metus suscipit
        vel. Mauris ultricies lectus sed lobortis finibus. Vivamus eu urna eget
        velit cursus viverra quis vestibulum sem. Aliquam tincidunt eget purus
        in interdum. Cum sociis natoque penatibus et magnis dis parturient
        montes, nascetur ridiculus mus.
      </p>
      <p>
        Nam vulputate diam nec tempor bibendum. Donec luctus augue eget
        malesuada ultrices. Phasellus turpis est, posuere sit amet dapibus ut,
        facilisis sed est. Nam id risus quis ante semper consectetur eget
        aliquam lorem. Vivamus tristique elit dolor, sed pretium metus suscipit
        vel. Mauris ultricies lectus sed lobortis finibus. Vivamus eu urna eget
        velit cursus viverra quis vestibulum sem. Aliquam tincidunt eget purus
        in interdum. Cum sociis natoque penatibus et magnis dis parturient
        montes, nascetur ridiculus mus.
      </p>
    </div>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export const Head = () => <Seo title="Page two" />

export default SecondPage
