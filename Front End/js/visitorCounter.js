getVisitors()

function getVisitors() {
    fetch('https://xo89eva9p1.execute-api.us-east-1.amazonaws.com/prod/visitorcounter', {
        method: 'POST'
        })
        .then(response => {
            return response.json()
        })
        .then(visitors => {
            document.getElementById('counter').innerHTML = visitors[1];
        })
}