window.updateScroll = function (element) {
    //var element = document.getElementById(id);
    element.scrollTop = element.scrollHeight;
}

window.clipboardCopy = {
    copyText: function (text) {
        navigator.clipboard.writeText(text).then(function () {
            alert("Copied to clipboard!");
        })
            .catch(function (error) {
                alert(error);
            });
    }
};