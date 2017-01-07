$(function() {
  //console.log('mmm')
  loadPost()
})

function addPost() {
  var post = $("#post").val()
  if (post.length === 0) {
    alert("请输入内容")
    return
  }
  var params = { post: post }
  $.post("http://localhost:3000/blog", params, function(data) {
    $("#post").val("")
    loadPost()
  })
}

function loadPost() {
  $.get("http://localhost:3000/blogs", function(data) {
    //console.log(data)
    var html = ""
    for (var item of data) {
      var localTime = moment(item.postTime).format("YYYY-MM-DD HH:mm")
      var postId = item._id
      html += `<li>${item.post} ${localTime} <button type="button" style="border:none" class="btn btn-default" onclick="delPost('${postId}')">删除</button>
       <button type="button" data-toggle="modal" data-target="#myModal" style="border:none" class="btn btn-default" onclick="editPost('${postId}', '${item.post}')">编辑</button></li>`
    }
    $("#blogs").html(html)
  })
}

function delPost(postId) {
  var params = { id: postId }
  $.get("http://localhost:3000/delblog", params, function(data) {
    loadPost()
  })
}

function searchPost() {
  var content = $("#content").val()
  var params = { dta: content }
    //console.log(content)
  $.get("http://localhost:3000/searchblog", params, function(data) {
    var html = ""
    for (var item of data) {
      var localTime = moment(item.postTime).format("YYYY-MM-DD HH:mm")
      var postId = item._id
      html += `<li>${item.post} ${localTime} <button type="button" style="border:none" class="btn btn-default" onclick="delPost('${postId}')">删除</button></li>`
    }
    $("#blogs").html(html)
  })
}

function editPost(postId, content) {
  $("#newid").val(postId)
  $("#newcontent").val(content)
}

function updatePost() {
  var id = $("#newid").val()
  var content = $("#newcontent").val()
  var params = { id: id, dta: content }
  $.get("http://localhost:3000/updateblog", params, function(data) {
    //alert(id)
    //alert(content)
    $("#myModal").modal("hide")
    loadPost()
  })
}
