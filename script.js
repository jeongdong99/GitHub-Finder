const user_avatar = document.getElementById("user_avatar");

const apiUrl = `https://api.github.com/users/`;

let user;
let profile;

class User {
  constructor(avatar, profile) {
    this.avatar = avatar;
    this.profile = profile;
  }
}

class Profile {
  constructor(
    company,
    blog,
    location,
    memberSince,
    public_repos,
    public_gists,
    followers,
    following
  ) {
    this.company = company;
    this.blog = blog;
    this.location = location;
    this.memberSince = memberSince;
    this.public_repos = public_repos;
    this.public_gists = public_gists;
    this.followers = followers;
    this.following = following;
  }
}

document
  .getElementById("name-input")
  .addEventListener("keypress", enterKeyPress);

function enterKeyPress(e) {
  if (e.key === "Enter") {
    const userName = document.getElementById("name-input").value;
    if (userName) {
      getUserInfo(userName);
    }
  }
}

function makeUser(avatar_url, profile) {
  user = new User(avatar_url, profile);
}

function makeUserProfile(jsonRes) {
  profile = new Profile(
    jsonRes.company,
    jsonRes.blog,
    jsonRes.location,
    jsonRes.memberSince,
    jsonRes.public_repos,
    jsonRes.public_gists,
    jsonRes.followers,
    jsonRes.following
  );
}

function showByClassName(className) {
  document.getElementsByClassName(className)[0].classList.remove("hide");
}

async function getUserInfo(userName) {
  try {
    const res = await fetch(apiUrl + userName);
    if (res.ok) {
      const jsonRes = await res.json();
      console.log(jsonRes);
      makeUserProfile(jsonRes);
      makeUser(jsonRes.avatar_url, profile);
      showByClassName("profile-div hide");
    } else {
      window.alert("해당 ID를 가진 유저가 없습니다!");
    }
  } catch (error) {
    console.log(error);
  } finally {
    console.log("--작업 완료--");
  }
}

const view_profile_btn = document.getElementById("viewProfileBtn");
view_profile_btn.addEventListener("click", viewProfile);

function viewProfile(user) {
  document.getElementById("user_avatar").src = user.user_avatar;

  document.getElementById("github-active-list").innerHTML = `
  <span class="badge text-bg-primary">Public Repos: ${user.profile.public_repos}</span>
  <span class="badge text-bg-secondary">Public Gists: ${user.profile.public_gists}</span>
  <span class="badge text-bg-third">Followers: ${user.profile.followers}</span>
  <span class="badge text-bg-fourth">Following: ${user.profile.following}</span>
`;

  document.getElementById("user-info-list").innerHTML = `
  <li>Company: ${user.profile.company}</li>
  <li>Website/Blog: ${user.profile.blog}</li>
  <li>Location: ${user.profile.location}</li>
  <li>Member Since: ${user.profile.memberSince}</li>
  `;
}
