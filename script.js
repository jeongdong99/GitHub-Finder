// api 주소
const apiUrl = `https://api.github.com/users/`;

// 클래스 정의
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

// 입력후 enter를 누르면 동작
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

// Profile 클래스 만들기

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

// 유저 정보 fetch로 가져오기

async function getUserInfo(userName) {
  try {
    const userRes = await fetch(apiUrl + userName);
    if (userRes.ok) {
      const userJson = await userRes.json();
      const user = new User(userJson.avatar_url, makeUserProfile(userJson));
      renderUserInfo(user);
      getRepos(userJson.repos_url);
    } else {
      throw new Error("Request faild");
    }
  } catch (error) {
    window.alert("해당 ID를 가진 유저가 없습니다!");
  } finally {
    console.log("--작업 완료--");
  }
}

// 화면에 user정보 뿌리기

async function renderUserInfo(user) {
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

// 동적 생성된 viewProfile 버튼에 이번트 넣어주기

let toggleFlag = true;
function viewProfile() {
  if (toggleFlag) {
    document.getElementsByClassName("user-div")[0].classList.remove("hide");
    toggleFlag = false;
  } else {
    document.getElementsByClassName("user-div")[0].classList.add("hide");
    toggleFlag = true;
  }
}

// repos 정보 fetch로 가져오기
async function getRepos(repos_url) {
  try {
    const reposRes = await fetch(repos_url + "?sort=updateed");
    if (reposRes.ok) {
      const reposJson = await reposRes.json();
      renderRepos(reposJson);
    }
  } catch (err) {
    console.error(err);
  }
}

//  repos 정보 화면에 뿌리기
function renderRepos(repos) {
  const repoContainer = document.getElementsByClassName("repos-container")[0];
  repoContainer.innerHTML = `<h2 id="repos-title">Latest Repos</h2>`;
  repos.slice(0, 5).forEach((repo) => {
    const newRepo = document.createElement("div");
    newRepo.classList.add("repos-div");
    newRepo.innerHTML = `
    <a id="repos-name" href=https://github.com/${repo.owner.login}/${repo.name}> ${repo.name} </a>

    <div class="repos-info">
      <span class="badge text-bg-primary">Stars: ${repo.stargazers_count}</span>
      <span class="badge text-bg-secondary">Watchers: ${repo.watchers}</span>
      <span class="badge text-bg-third">Forks: ${repo.forks}</span>
    </div>
        `;
    repoContainer.appendChild(newRepo);
  });
}
