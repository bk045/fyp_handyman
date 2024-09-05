import React, { Component } from 'react';
import axios from 'axios';

const apiEndPoint = 'https://jsonplaceholder.typicode.com/posts';
class Backend extends Component {
    state = { 
        posts:[],
     } 
     async componentDidMount(){
        const response = await axios.get(apiEndPoint)
        // const response = await promise;
        const { data:posts } = response;
        this.setState({posts});
    }
    handelDelete=async(post)=>{
        await axios.delete(apiEndPoint+"/"+post.id);
        const posts = this.state.posts.filter(p=>p.id !== post.id);
        this.setState({posts});
    }

    handelAdd=async()=>{
        const obj={body:'body', title:'title'}
        const {data: post} = await axios.post(apiEndPoint, obj);
        const posts = [post, ...this.state.posts];
        this.setState({posts});
        // console.log(post);
    }
    handelUpdate=async(post)=>{
        post.title = "UPDATED";
        await axios.put(apiEndPoint+"/"+post.id, post);
        const posts = [...this.state.posts];
        const index = posts.indexOf(post);
        posts[index] = {...post};
        this.setState({posts});
    };
    render() { 
        return (
            <div>
                <h1>Backend</h1>
                <div className="flex justify-center space-x-2">
                    <button
                        type="button"
                        className="inline-block rounded -bg--color-primary px-6 pt-2.5 pb-2 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                        onClick={this.handelAdd}
                        >
                        Add
                    </button>
                </div>
                <div>{this.state.posts.map(post=><ul key={post.title}>
                        <li>{post.id}</li>
                        <li>{post.title}</li>
                        <li>{post.body}</li>
                        <div className='flex'>
                            <button
                                type="button"
                                className="inline-block rounded bg-green-600 px-6 pt-2.5 pb-2 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                onClick={()=>this.handelUpdate(post)}
                                >
                                Update
                            </button>
                            <button
                                type="button"
                                className="inline-block rounded bg-red-600 px-6 pt-2.5 pb-2 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                onClick={()=>this.handelDelete(post)}
                                >
                                Delete
                            </button>
                        </div>
                    </ul>)}
                </div>
            </div>
        );
    }
}
 
export default Backend;