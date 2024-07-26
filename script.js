document.addEventListener("DOMContentLoaded", function() {
    // Populate interests
    const interests = ["Web designing", "Music", "Drawing", "Religious book reading", "Travelling"];
    const interestsContainer = document.getElementById("interests");
    interests.forEach(interest => {
        const span = document.createElement("span");
        span.className = "w3-tag w3-small w3-theme-d5";
        span.innerText = interest;
        interestsContainer.appendChild(span);
    });

    // Populate notifications
    const notifications = [
        "One new friend request",
        "John Doe posted on your wall",
        "Jane likes your post"
    ];
    const notificationsContainer = document.getElementById("notifications");
    notifications.forEach(notification => {
        const a = document.createElement("a");
        a.href = "#";
        a.className = "w3-bar-item w3-button";
        a.innerText = notification;
        notificationsContainer.appendChild(a);
    });

    // Populate initial friend requests
    addFriendRequest("Jane Doe", "https://www.w3schools.com/w3images/avatar6.png");
    setInterval(() => {
        addFriendRequest("Random User", "https://www.w3schools.com/w3images/avatar5.png");
    }, 60000);

    // Populate posts
    const posts = [
        {
            author: "John Doe",
            content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            images: ["https://www.w3schools.com/w3images/lights.jpg", "https://www.w3schools.com/w3images/nature.jpg"],
            time: "1 min"
        },
        {
            author: "Jane Doe",
            content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            images: [],
            time: "16 min"
        },
        {
            author: "Angie Jane",
            content: "Have you seen this?",
            images: ["https://www.w3schools.com/w3images/nature.jpg"],
            time: "32 min"
        }
    ];
    const postsContainer = document.getElementById("posts");
    posts.forEach(post => {
        addPost(post);
    });

    // Check if there are more than one friend requests and show controls if necessary
    checkFriendRequestControls();
});

function toggleAccordion(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += " w3-theme-d1";
    } else { 
        x.className = x.className.replace(" w3-show", "");
        x.previousElementSibling.className = x.previousElementSibling.className.replace(" w3-theme-d1", "");
    }
}

// Used to toggle the menu on smaller screens when clicking on the menu button
function openNav() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
}

function postStatus() {
    const status = document.getElementById("status").innerText;
    const uploadInput = document.getElementById("upload");
    const postsContainer = document.getElementById("posts");
    
    let images = [];
    if (uploadInput.files.length > 0) {
        for (let i = 0; i < uploadInput.files.length; i++) {
            const file = uploadInput.files[i];
            const reader = new FileReader();
            reader.onload = function(e) {
                images.push(e.target.result);
                if (images.length === uploadInput.files.length) {
                    addPost({author: "Prathamesh V", content: status, images: images, time: "Just now"});
                }
            };
            reader.readAsDataURL(file);
        }
    } else {
        addPost({author: "Prathamesh V", content: status, images: [], time: "Just now"});
    }
    
    document.getElementById("status").innerText = "";
    uploadInput.value = "";
}

function addPost(post) {
    const postsContainer = document.getElementById("posts");
    const postDiv = document.createElement("div");
    postDiv.className = "w3-container w3-card w3-white w3-round w3-margin";
    postDiv.innerHTML = `
        <br>
        <img src="https://www.w3schools.com/w3images/avatar2.png" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
        <span class="w3-right w3-opacity">${post.time}</span>
        <h4>${post.author}</h4><br>
        <hr class="w3-clear">
        <p>${post.content}</p>
        <div class="w3-row-padding" style="margin:0 -16px">
            ${post.images.map(image => `<div class="w3-half"><img src="${image}" style="width:100%" class="w3-margin-bottom"></div>`).join('')}
        </div>
        <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom" onclick="likePost(this)"><i class="fa fa-thumbs-up"></i> Like</button>
        <button type="button" class="w3-button w3-theme-d2 w3-margin-bottom" onclick="commentPost(this)"><i class="fa fa-comment"></i> Comment</button>
        <button type="button" class="w3-button w3-red w3-margin-bottom" onclick="deletePost(this)"><i class="fa fa-trash"></i> Delete</button>
        <div class="w3-container" id="commentsContainer">
            <!-- Comments will be dynamically populated -->
        </div>
    `;
    postsContainer.insertBefore(postDiv, postsContainer.firstChild);
}

function likePost(button) {
    button.classList.toggle("w3-theme-d1");
}

function commentPost(button) {
    const commentBox = document.createElement("div");
    commentBox.innerHTML = `
        <input type="text" class="w3-input w3-border w3-margin-bottom" placeholder="Write a comment...">
        <button type="button" class="w3-button w3-theme-d2 w3-margin-bottom" onclick="postComment(this)">Post</button>
    `;
    button.parentElement.appendChild(commentBox);
    button.disabled = true;
}

function postComment(button) {
    const commentText = button.previousElementSibling.value;
    if (commentText.trim() === "") return;
    
    const commentDiv = document.createElement("div");
    commentDiv.className = "w3-container w3-card w3-white w3-round w3-margin-bottom";
    commentDiv.innerHTML = `
        <p>${commentText}</p>
        <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom" onclick="likePost(this)"><i class="fa fa-thumbs-up"></i> Like</button>
        <button type="button" class="w3-button w3-theme-d2 w3-margin-bottom" onclick="replyComment(this)"><i class="fa fa-reply"></i> Reply</button>
        <div class="w3-container w3-margin-left" id="repliesContainer">
            <!-- Replies will be dynamically populated -->
        </div>
    `;
    const commentsContainer = button.parentElement.parentElement.querySelector("#commentsContainer");
    commentsContainer.appendChild(commentDiv);
    
    button.previousElementSibling.value = "";
}

function replyComment(button) {
    const replyBox = document.createElement("div");
    replyBox.innerHTML = `
        <input type="text" class="w3-input w3-border w3-margin-bottom" placeholder="Write a reply...">
        <button type="button" class="w3-button w3-theme-d2 w3-margin-bottom" onclick="postReply(this)">Post</button>
    `;
    button.parentElement.appendChild(replyBox);
    button.disabled = true;
}

function postReply(button) {
    const replyText = button.previousElementSibling.value;
    if (replyText.trim() === "") return;
    
    const replyDiv = document.createElement("div");
    replyDiv.className = "w3-container w3-card w3-white w3-round w3-margin-bottom";
    replyDiv.innerHTML = `
        <p>${replyText}</p>
        <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom" onclick="likePost(this)"><i class="fa fa-thumbs-up"></i> Like</button>
    `;
    const repliesContainer = button.parentElement.parentElement.querySelector("#repliesContainer");
    repliesContainer.appendChild(replyDiv);
    
    button.previousElementSibling.value = "";
}

function deletePost(button) {
    const postDiv = button.parentElement;
    postDiv.parentElement.removeChild(postDiv);
}

function addFriendRequest(name, avatar) {
    const friendRequestsContainer = document.getElementById("friendRequests");
    const friendCard = document.createElement("div");
    friendCard.className = "friend-card w3-container w3-card w3-white w3-round w3-margin";
    friendCard.innerHTML = `
        <div class="friend-front w3-center">
            <img src="${avatar}" alt="Avatar" style="width:50%"><br>
            <span>${name}</span>
            <div class="w3-row w3-opacity">
                <div class="w3-half">
                    <button class="w3-button w3-block w3-green w3-section" title="Accept" onclick="acceptFriendRequest(this)"><i class="fa fa-check"></i></button>
                </div>
                <div class="w3-half">
                    <button class="w3-button w3-block w3-red w3-section" title="Decline" onclick="declineFriendRequest(this)"><i class="fa fa-remove"></i></button>
                </div>
            </div>
        </div>
        <div class="friend-back w3-center w3-padding-32">
            <p>Accepted</p>
        </div>
    `;
    friendRequestsContainer.appendChild(friendCard);
    checkFriendRequestControls();
}

function acceptFriendRequest(button) {
    const friendCard = button.closest(".friend-card");
    friendCard.classList.add("flipped");
    setTimeout(() => {
        friendCard.parentElement.removeChild(friendCard);
        checkFriendRequestControls();
    }, 1000);
}

function declineFriendRequest(button) {
    const friendCard = button.closest(".friend-card");
    friendCard.parentElement.removeChild(friendCard);
    checkFriendRequestControls();
}

function showEventDetails(title, dateTime, description) {
    document.getElementById("eventTitle").innerText = title;
    document.getElementById("eventDateTime").innerText = dateTime;
    document.getElementById("eventDescription").innerText = description;
    document.getElementById("eventPopup").style.display = 'block';
}

function checkFriendRequestControls() {
    const friendRequestsContainer = document.getElementById("friendRequests");
    const friendRequestControls = document.getElementById("friendRequestControls");
    const friendCards = friendRequestsContainer.getElementsByClassName("friend-card");

    if (friendCards.length > 1) {
        for (let i = 1; i < friendCards.length; i++) {
            friendCards[i].style.display = "none";
        }
        friendRequestControls.classList.remove("w3-hide");
    } else {
        friendRequestControls.classList.add("w3-hide");
    }
}

function showMoreRequests() {
    const friendRequestsContainer = document.getElementById("friendRequests");
    const friendCards = friendRequestsContainer.getElementsByClassName("friend-card");
    for (let i = 1; i < friendCards.length; i++) {
        friendCards[i].style.display = "block";
    }
}

function clearAllRequests() {
    const friendRequestsContainer = document.getElementById("friendRequests");
    while (friendRequestsContainer.firstChild) {
        friendRequestsContainer.removeChild(friendRequestsContainer.firstChild);
    }
    checkFriendRequestControls();
}
