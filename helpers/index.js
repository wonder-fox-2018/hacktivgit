module.exports = {

  listRepoStarred (data) {
    let temp = []

    for (let i = 0; i < data.length; i++) {
      if (data[i].stargazers_count > 0) {
        temp.push(data[i])
      }
    }

    return temp
  }

}