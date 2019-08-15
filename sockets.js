// Setting up sockets with socket.io
const socket = io.connect('https://alloy-backend.herokuapp.com');

socket.on('error', function (err) {
    console.log('received socket error:');
    console.log(err);
})

function registerMessageHandler() {
    socket.on('message', (data) => {
        addMessages(data);
        scrollToBottom();
    });
    
}

function unregisterMessageHandler() {
    socket.off('message');
}

function registerAssignmentHandler() {
    socket.on('new_assignment', (data) => {
        addAssignmentToSidebar(data);
    })
}

function unregisterAssignmentHandler() {
    socket.off('new_assignment');
}

function joinCourse(courseID, name, callback) {
    socket.emit('join_course', {courseID, name}, callback);
    registerAssignmentHandler();
}

function leaveCourse(courseID, name, callback) {
    socket.emit('leave_course', {courseID, name}, callback);
    unregisterAssignmentHandler();
}

function joinAssignment(assignmentID, courseID, googleID, name, callback) {
    window.assignmentID = assignmentID;
    window.courseID = courseID;
    socket.emit('join_assignment', {assignmentID, courseID, googleID, name}, callback)
    registerMessageHandler();
}
function leaveAssignment(assignmentID, courseID, googleID, name, callback) {
    socket.emit('leave_assignment', {assignmentID, courseID, googleID, name}, callback)
    unregisterMessageHandler();
}

function messageCourse(assignmentID, courseID, googleID, name, photoLink, sessionToken, time, message, callback) {
    socket.emit('message', {assignmentID, courseID, googleID, name, photoLink, sessionToken, time, message}, callback)
}
function addAssignment(courseID, assignmentName, googleID, callback) {
    socket.emit('new_assignment', {courseID, assignmentName, googleID}, callback)
}