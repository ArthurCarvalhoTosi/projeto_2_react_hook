export const loadPosts = async () => {
    const photosResponse = await fetch('https://jsonplaceholder.typicode.com/photos');
    const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');

    const [posts, photos] = await Promise.all([postsResponse,
        photosResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();


    const postsAndPhotos = postsJson.map((post, index) => {
        return { ...post, cover: photosJson[index].url }
    });

    return postsAndPhotos;
}