import React from 'react'
import Blog from './Blogs'
import ContactForm from './Contact'
import Experience from './Experience'
import Home from './Home'
import Offerings from './Offerings'
import AnalyticsServices from './Services'

function Layout() {
  return (
    <>
      <Home />
      <Offerings />
      <Experience />
      <Blog />
      <AnalyticsServices />
      <ContactForm />
    </>
  )
}

export default Layout