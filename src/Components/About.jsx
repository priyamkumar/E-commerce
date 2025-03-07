import { Button, Typography } from '@mui/material'
import React from 'react'
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function About() {

  return (
    <div className="aboutSection">
    <div></div>
    <div className="aboutSectionGradient"></div>
    <div className="aboutSectionContainer">
      <Typography component="h1">About Us</Typography>

      <div>
        <div>
          <Typography>Made By Priyam Kumar</Typography>
          <span>
            This is a sample website. Made only for the
            purpose of learning MERN Stack.
          </span>
        </div>
        <div className="aboutSectionContainer2">
          <Typography component="h2">My Profiles</Typography>
          <a
            href="https://x.com/PriyamK05820674"
            target="blank"
          >
            <XIcon className="xSvgIcon" />
          </a>
          <a
            href="https://www.linkedin.com/in/priyam-kumar-154ab1340/"
            target="blank"
          >
            <LinkedInIcon className="linkedinSvgIcon" />
          </a>

          <a href="https://github.com/priyamkumar" target="blank">
            <GitHubIcon className="githubSvgIcon" />
          </a>
        </div>
      </div>
    </div>
  </div>
  )
}
