"use strict";

// Importing the array of the videos
import { database } from "./database.js"


// Main Class to control all the other functions


class main {
    constructor() {

        // Fetching all the data from the database || And assigning to the instance
        const allVideos = database();
        this.allVideos = allVideos;        
        this.watchVideo = this.watchVideo;

        
        // calling the functions
        
        try {
          this.renderVideos(".allvideoSection");
          this.renderRecommendedIconButton(".recommendationsWrapper");
        } catch (error) {}

        try {
          this.settingIframe();
        } catch (error) {}

        try {
          this.renderVideos(".videoRecommendation");
        } catch (error) {}
    }
    
    renderVideos(containerId) {
        const container = document.querySelector(containerId);
        this.allVideos.map((videoData) => {
          const html = `
          <div class="videoContainer";">
  
          <div class="thumbnailContainer">
            <img src="http://unsplash.it/300/200" alt="video">
          </div>
  
          <div class="videoDetails">
                <div class="channelImage">
                  <img src="http://unsplash.it/40/40" alt="img">
                </div>
  
                <div class="video-Detail-Description">
                    <h1>${videoData.title}</h1>
                    <p>${videoData.name}</p>
                    <div class="sub-video-Detail-Description">
                      <p>${videoData.views} views • ${videoData.uploadedDate} years ago</p>
                    </div>
                </div>
          </div>
  
        </div>`;

          container.insertAdjacentHTML("afterbegin", html);
        })
      
      const allVideoElements = document.querySelectorAll(".videoContainer");
      for(let i = allVideoElements.length - 1; i >= 0; i--) {
        allVideoElements[i].addEventListener("click", ()=>{
          let link = this.allVideos[i]['link'];
          let title = this.allVideos[i]['title'];
          let description = this.allVideos[i]['description'];

          // Save this in local Storaage and send the user to he watching page
          localStorage.setItem("linkToTheVideo", link)
          localStorage.setItem("title", title)
          localStorage.setItem("description", description)
          window.location.href = "videoView.html";
        });
      }
      
    }

    renderRecommendedIconButton(containerId) {
        const container = document.querySelector(containerId);
        const html = `<div id="recommendationsButton"> icon </div> `

              for(let x = 0; x <= 5; x++) {
                container.insertAdjacentHTML("afterbegin", html)
              }
    }

    settingIframe() {
      let title = localStorage.getItem("title");
      let description = localStorage.getItem("description");
      let linkToTheVideo = localStorage.getItem("linkToTheVideo");
      const iframe = document.querySelector(".iframe");
      const iframeVideoDetails = document.querySelector(".videosDetails");
      let html;
      if(!title || !description || !linkToTheVideo) {
        html = `<iframe src="https://www.youtube.com/embed/w-ODm6AUayE" frameborder="0" allow="autoplay" allowfullscreen></iframe>`
      }

      else{
        html = `<iframe src="${linkToTheVideo}" frameborder="0" allow="autoplay" allowfullscreen></iframe>`
      }
      
      let videoDetailsHtml = `<h1>${title}</h1>
                              <div><span id="description">${description}</span> <span id="VideosDesc">more</span></div>`



      iframe.insertAdjacentHTML("afterbegin", html)
      iframeVideoDetails.insertAdjacentHTML("afterbegin", videoDetailsHtml);

      const iframeVideoDetailsSpecific = document.querySelector(".videosDetails span");
      let lessText = iframeVideoDetailsSpecific.innerText.slice(0, 20);
      lessText+= "..."
      // Setting Less Text
      iframeVideoDetailsSpecific.innerText = lessText;

      this.stylingDescription();
    }

    stylingDescription() {
      // Adding a link along with the EventListener
      let description = localStorage.getItem("description");
      let descriptionHandler = document.querySelector("#VideosDesc");
      
      descriptionHandler.addEventListener("click", () => {
        let currentDescription = document.querySelector("#description");
        let currentDescriptionText = currentDescription.innerText;
        let drawerButton = document.querySelector("#VideosDesc");
        

        if(currentDescriptionText.slice(currentDescriptionText.length - 3, currentDescriptionText.length) === "..."){
          currentDescription.innerText = description;
          drawerButton.innerText = "less";
        }

        else{
          currentDescription.innerText = description.slice(0, 20);
          currentDescription.innerText += "...";
          drawerButton.innerText = "more";
        }
        
      });
    }
    
}

const instance = new main();
