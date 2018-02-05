var socket = io();

function setRoom (roomId) {
    document.getElementById('room-input').value = roomId;
}

function toggleList () {
    document.getElementById("drop-list").classList.toggle("show");
}

window.onclick = function (e) {
    var listOn = document.getElementById("drop-list").classList.contains("show");
    if (!event.target.matches('.drop-input') && listOn ) {
        document.getElementById("drop-list").classList.toggle("show");

    }
}


socket.on('updateRoomList', function (rooms) {
    var ol = jQuery('<ul></ul>');

    rooms.forEach(function (room) {
        ol.append(jQuery('<li id="' + room +'" onclick="setRoom(this.id)"></li>').text(room));
    });

    jQuery('#drop-list').html(ol);

});