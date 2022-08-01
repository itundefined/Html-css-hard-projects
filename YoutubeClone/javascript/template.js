// Importing the array of the videos
import { database } from "./database.js"
const allVideos = database();




// Homepage

document.getElementsByClassName("header-item1")[0].addEventListener("click", () => {
    window.location.replace("/html/index.html");
})


// Changing the iframe src 
function iframeHandler() {
    let linkparaVideo, titleText, descriptionText;
    if(localStorage.getItem("linkToTheVideo"))
    {
        linkparaVideo = localStorage.getItem("linkToTheVideo");
        titleText = localStorage.getItem("title");
        descriptionText = localStorage.getItem("description");
    }
    else{
        linkparaVideo = "https://www.youtube.com/embed/DDAhcohJQck";
        titleText = "Welcome";
        descriptionText = "Thanks for visiting this demo project"
    }

    const iframe = document.getElementById("videoToShow");
    iframe.setAttribute("src", linkparaVideo)

    const bottomBar = document.getElementsByClassName("bottombar")[0];

    // creating element title and description

    const title = document.createElement("h3");
    const description = document.createElement("p")

    const titleData = document.createTextNode(titleText);
    const descriptionData = document.createTextNode(descriptionText);

    // Appending

    title.appendChild(titleData);
    description.appendChild(descriptionData);

    bottomBar.appendChild(title);
    bottomBar.appendChild(description);
}

try {
    iframeHandler();
} catch (error) {
    
}

// Creating and appending childs now
function VideoWidget() {
    // Main Section 

    const VideoSection = document.getElementsByClassName("videos-section")[0];

    allVideos.map((element, index) => {
        // Creating divs
        // Parent
        const VideoElement = document.createElement("div");
        VideoElement.classList.add("video-element");
        
        // Children 1
        const thumbnailcontainer = document.createElement("div");
        thumbnailcontainer.classList.add("thumbnail-container");

        const img = document.createElement("img");
        img.setAttribute("src", "http://unsplash.it/300/180")
        img.setAttribute("alt", "profile")

        thumbnailcontainer.appendChild(img);

        // children 2 it will have every other childrens

        const videoDataContainer = document.createElement("div");
        videoDataContainer.classList.add("video-data-container");

        // Sub childrens ----------1
        const channelImage = document.createElement("div")
        channelImage.classList.add("channel-image");

        // sub sub div 
        const profileImageContainer = document.createElement("div");
        profileImageContainer.classList.add("profile-image-container");
        profileImageContainer.classList.add("clickable")

        const img1 = document.createElement("img");
        img1.setAttribute("alt", "profile-image")
        img1.setAttribute("src", "http://unsplash.it/40/40");

        // Appending all the childrens to thier parent
        profileImageContainer.appendChild(img1)
        channelImage.appendChild(profileImageContainer);
        videoDataContainer.appendChild(channelImage);

        // Sub childrens ---------- 2

        const videoChannelData = document.createElement("div"); 
        videoChannelData.classList.add("video-channel-data")

        // Sub sub Div 1

        const Videoinfo = document.createElement("div");
        Videoinfo.classList.add("video-info");
        const heading = document.createElement("h3");
        const headingdata = document.createTextNode(element.title)
        heading.appendChild(headingdata);
        Videoinfo.appendChild(heading);

        // sub sub div 2

        const ChannelInfo = document.createElement("div");
        ChannelInfo.classList.add("channel-info")
        const channelName = document.createElement("p")
        channelName.classList.add("channel-name")
        channelName.setAttribute("channel", element.name);
        ChannelInfo.appendChild(channelName)

        // sub sub sub div 
        const ViewsData = document.createElement("div");
        ViewsData.classList.add("views-date")
        const span1 = document.createElement("span")
        const span2 = document.createElement("span2")
        const span3 = document.createElement("spa3")
        const span4 = document.createElement("spa4")
        const span5 = document.createElement("spa5")

        const span2Text = document.createTextNode("views")
        const span3Text = document.createTextNode("•")
        const span5Text = document.createTextNode("ago")
        span2.appendChild(span2Text)
        span3.appendChild(span3Text)
        span5.appendChild(span5Text);


        span1.classList.add("views");
        span1.setAttribute("views", "100k");
        span4.classList.add("days")
        span4.setAttribute("daysNumber", "2 days");

        ViewsData.appendChild(span1)
        ViewsData.appendChild(span2)
        ViewsData.appendChild(span3)
        ViewsData.appendChild(span4)
        ViewsData.appendChild(span5)


        // Appending these
        
        ChannelInfo.appendChild(ViewsData)
        videoChannelData.appendChild(Videoinfo);
        videoChannelData.appendChild(ChannelInfo);

        // Appending the upper level Video Channel data now
        videoDataContainer.appendChild(channelImage);
        videoDataContainer.appendChild(videoChannelData);        

        // Appending into the main div

        VideoElement.appendChild(thumbnailcontainer);
        VideoElement.appendChild(videoDataContainer);

        // Appending to the main section

        VideoSection.appendChild(VideoElement)

        VideoElement.addEventListener("click", ()=>{
            // Save this in local Storaage and send the user to he watching page
            localStorage.setItem("linkToTheVideo", element.link)
            localStorage.setItem("title", element.title)
            localStorage.setItem("description", element.description)
            window.location.replace("videoView.html");
        })
    })
}

VideoWidget();
