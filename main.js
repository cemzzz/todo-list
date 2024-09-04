let taskInput = document.getElementById('task-input'); // 유저 할 일 입력
let taskTag = document.getElementById('task-tag'); // 유저 태그 입력
let taskAddButton = document.getElementById('task-add-button'); // 할 일 추가 버튼
let taskTagButton = document.getElementById('task-tag-button'); // 태그 추가 버튼
let tagContainer = document.getElementById('tag-container'); // 태그 컨테이너

let taskTabs = document.querySelectorAll(".task-tabs div") // 카테고리 분류
let taskList = [] // 추가된 할 일 목록 저장
let chosenTab = 'task-All'; // 선택한 탭 기본값은 task-All;
let inProgressList = [] 
let taskDoneList = [] 


taskAddButton.addEventListener('click', taskAdd); // 할 일 추가 실행 이벤트
taskTagButton.addEventListener('click', addTag); // 태그 추가 실행 이벤트

taskTag.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTag();
    }
});

taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        taskAdd();
    }
});

//카테고리 클릭이벤트
for(let i=0; i<taskTabs.length; i++){
    taskTabs[i].addEventListener("click", function(event){
        kategorie(event)
    });
}

function addTag() {
    let tagValue = taskTag.value.trim(); // 공백 제거
    if (tagValue === '' || tagValue.startsWith('!')) {
        return; // 빈 값이나 '#'로 시작하는 값은 무시
    }

    //태그 HTML 생성 삭제 버튼 포함
    let tagHTML = `
        <div class="task-content-tag" data-tag="${tagValue}">
            #${tagValue}
            <button class="tag-delete-button" onclick="removeTag(this)">✖</button>
        </div>`;
    tagContainer.innerHTML += tagHTML;
    taskTag.value = ''; // 입력 필드 초기화
}

function removeTag(button) {
    let tagElement = button.parentElement;
    tagElement.remove(); // 태그 요소 삭제
}

function taskAdd() {
    if (taskInput.value.trim() === '') {
        alert('입력된 내용이 없습니다.');
        return;
    }

    //태그 목록
    let tags = Array.from(tagContainer.getElementsByClassName('task-content-tag'))
                    .map(tag => tag.dataset.tag.trim());

    let taskInfo = {
        id: randomUID(),
        taskContent: taskInput.value,
        taskTags: tags,
        isComplete: false
    };
    taskList.push(taskInfo);
    taskRender(); // 버튼 클릭 시 taskRender() 함수 실행
    taskInput.value = ''; // 함수 실행 뒤 입력값 초기화
    tagContainer.innerHTML = ''; // 태그 컨테이너 초기화
    taskTag.value = ''; 
}

function taskDelete(id) {
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i, 1); // i번째 인덱스의 요소를 삭제
            break;
        }
    }
    taskRender();
}

function taskRender() {
    let chosenTabList = []
    if (chosenTab === 'task-All') {
        chosenTabList = taskList;
    } else if (chosenTab === 'in-Progress') {
        chosenTabList = inProgressList;
    } else if (chosenTab === 'task-Done') {
        chosenTabList = taskDoneList;
    }

    let resultHTML = '';
    for (let i = 0; i < chosenTabList.length; i++) {
        let tagsHTML = chosenTabList[i].taskTags.map(tag => `<div class="task-content-tag">#${tag}</div>`).join('');

        if (chosenTabList[i].isComplete == true) {
            resultHTML += 
            `<div class="task-complete-bg">
                <div class='task-content-area'>
                    <div class="task-complete">${chosenTabList[i].taskContent}</div>
                    <div class="task-content-tags">${tagsHTML}</div>
                </div>
                <div>
                    <button onClick="toggleComplete('${chosenTabList[i].id}')" class="task-prev-button">
                        <i class="fa-solid fa-rotate-left"></i>
                    </button>
                    <button onClick="taskDelete('${chosenTabList[i].id}')" class="task-delete-button">
                        <i class="fa-solid fa-x"></i>
                    </button>
                </div>
            </div>`;
        } else {
            resultHTML += 
            `<div class="task">
                <div class='task-content-area'>
                    <div class="task-content">${chosenTabList[i].taskContent}</div>
                    <div class="task-content-tags">${tagsHTML}</div>
                </div>
                <div>
                    <button onClick="toggleComplete('${chosenTabList[i].id}')" class="task-complete-button">
                        <i class="fa-solid fa-check"></i>
                    </button>
                    <button onClick="taskDelete('${chosenTabList[i].id}')" class="task-delete-button">
                        <i class="fa-solid fa-x"></i>
                    </button>
                </div>
            </div>`;
        }
    }
    document.getElementById('task-list').innerHTML = resultHTML;
}

function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    taskRender();
}

function kategorie(event){
    chosenTab = event.target.id;

    // 모든 탭에서 active 클래스를 제거
    for (let i = 0; i < taskTabs.length; i++) {
        taskTabs[i].classList.remove('active');
    }

    // 클릭된 탭에 active 클래스 추가
    event.target.classList.add('active');

    inProgressList = [] // 진행중인 할 일
    taskDoneList = [] // 완료된 일

    if(chosenTab === "task-All"){
        taskRender();
    } else if(chosenTab === "in-Progress"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === false){
                inProgressList.push(taskList[i])
            }
        }
        taskRender();
    } else if(chosenTab === "task-Done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === true){
                taskDoneList.push(taskList[i])
            }
        }
        taskRender();
    }
}

function randomUID() {
    return Math.random().toString(36).substr(2, 16);
}
