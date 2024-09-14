import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

let posts = [];

app.get('/', (req, res) => {
    res.render('index', { posts: posts });
});

app.post('/new-post', (req, res) => {
    const newPost = {
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);
    res.redirect('/');
});

app.get('/new-post', (req, res) => {
    res.render('new-post');
});

// Route เพื่อแสดงหน้าแก้ไขโพสต์
app.get('/edit-post/:id', (req, res) => {
    const postId = req.params.id;
    const post = posts[postId]; // หาโพสต์จาก id
    res.render('edit-post', { post: post, postId: postId });
});

// Route เพื่อจัดการการส่งข้อมูลจากฟอร์มแก้ไขโพสต์
app.post('/edit-post/:id', (req, res) => {
    const postId = req.params.id;
    posts[postId].title = req.body.title;     // อัปเดตชื่อโพสต์
    posts[postId].content = req.body.content; // อัปเดตเนื้อหาโพสต์
    res.redirect('/');
});

// Route สำหรับลบโพสต์
app.post('/delete-post/:id', (req, res) => {
    const postId = req.params.id;
    posts.splice(postId, 1); // ลบโพสต์ออกจาก array
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
