//사용자가 할 일 목록을 적는다.
// + 추가 버튼을 누르면 할일 리스트에 추가
// 삭제 버튼 삭제 시 할일 삭제
// 체크 버튼을 누르면 완료 처리 취소선이 그어지게 처리
// 탭을 누르면 클릭한 탭으로 언더바 이동
// 완료 탭에는 완료 할 일만 나오고 진행 탭에는 진행 중인 할 일만 나옴
// 전체 탭에는 완료 및 진행 중인 할 일이 나옴


let taskInput = document.getElementById('task-input'); //유저 입력
let taskAddButton = document.getElementById('task-add-button'); //할일 추가 버튼
let taskList = [] //추가된 할 일 목록 저장
let taskCompleteCheck = document.getElementById('task-complete-check') // 완료 체크

taskAddButton.addEventListener('click', taskAdd) //할일 추가 실행 이벤트
taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { 
        taskAdd(); 
    }
});


function taskAdd(){
    if (taskInput.value.trim() === '') {
        alert('입력된 내용이 없습니다.');
        return;
    }

    let taskInfo = {
        id : randomUID(),
        taskContent : taskInput.value,
        isComplete : false
    }
    taskList.push(taskInfo)
    console.log(taskList)
    taskRender() // 버튼 클릭 시 taskRender()함수 실행
    taskInput.value = '' //함수 실행 뒤 입력값 초기화
}

//할 일이 추가시키는 함수
function taskRender() {
    let resultHTML = '';
    for(let i=0; i<taskList.length; i++){
        if (taskList[i].isComplete == true) {
            resultHTML += 
            `<div class="task-complete-bg">
                <div class="task-complete">${taskList[i].taskContent}</div>
                <div>
                    <button onClick="toggleComplete('${taskList[i].id}')" class="task-prev-button">
                        <i class="fa-solid fa-rotate-left"></i>
                    </button>
                    <button class="task-delete-button">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>`;
        } else {
            resultHTML += 
            `<div class="task">
                <div class="task-content">${taskList[i].taskContent}</div>
                <div>
                    <button onClick="toggleComplete('${taskList[i].id}')" class="task-complete-button">
                        <i class="fa-solid fa-check"></i>
                    </button>
                    <button class="task-delete-button">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>`;
        }
       
    }
    document.getElementById('task-list').innerHTML = resultHTML;
}

//완료 on/off 체크
function toggleComplete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    taskRender()
}

//랜덤 유니크 ID
function randomUID() {
    return Math.random().toString(36).substr(2, 16);
}
