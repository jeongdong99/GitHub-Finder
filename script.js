const user_avatar = document.getElementById("user_avatar");

const apiUrl = `https://api.github.com/users/`;

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
    publicRepos,
    publicGists,
    followers,
    following
  ) {
    this.company = company;
    this.blog = blog;
    this.location = location;
    this.memberSince = memberSince;
    this.publicRepos = publicRepos;
    this.publicGists = publicGists;
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

function makeUser(avatar, profile) {
  const user = new User(avatar, profile);
  return user;
}

function makeUserProfile(jsonRes) {
  const profile = new Profile(
    jsonRes.company,
    jsonRes.blog,
    jsonRes.location,
    jsonRes.memberSince,
    jsonRes.public_repos,
    jsonRes.public_gists,
    jsonRes.followers,
    jsonRes.following
  );
  return profile;
}

function inputUserInfo(user) {
  document.getElementsByClassName("profile-div")[0].innerHTML = `
  <img id="user_avatar" src=${user.avatar} />
  <button id="viewProfileBtn" onclick="viewProfile()">View Profile</button>
  `;

  document.getElementsByClassName(
    "github-active-list"
  )[0].innerHTML = `<span class="badge text-bg-primary">Public Repos: ${user.profile.publicRepos}</span>
  <span class="badge text-bg-secondary">Public Gists: ${user.profile.publicGists}</span>
  <span class="badge text-bg-third">Followers: ${user.profile.followers}</span>
  <span class="badge text-bg-fourth">Following: ${user.profile.following}</span>`;

  document.getElementsByClassName(
    "user-info-list"
  )[0].innerHTML = `<li class="list-group-item"> Company: ${user.profile.company}</li>
  <li class="list-group-item">Website/Blog: ${user.profile.blog}</li>
  <li class="list-group-item">Location: ${user.profile.location}</li>
  <li class="list-group-item">Member Since: ${user.profile.memberSince}</li>`;
}

async function getUserInfo(userName) {
  try {
    const res = await fetch(apiUrl + userName);
    if (res.ok) {
      const jsonRes = await res.json();

      // 지워야함
      console.log(jsonRes);

      
      inputUserInfo(makeUser(jsonRes.avatar_url, makeUserProfile(jsonRes)));
    } else {
      window.alert("해당 ID를 가진 유저가 없습니다!");
    }
  } catch (error) {
    console.log(error);
  } finally {
    console.log("--작업 완료--");
  }
}

// 동적 생성된 버튼에 이번트 넣어주기
function viewProfile() {
  document.getElementsByClassName("user-div hide")[0].classList.remove("hide");
}
