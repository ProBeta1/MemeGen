import React, { Component } from "react";
import "./App.css";
class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      leftText: "",
      rightText: "",
      Img: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleClick(event) {
    let newstring = event.target.src.toString();
    //console.log(newstring);
    this.setState({
      Img: newstring
    });
  }

  handleSubmit() {}

  renderImage(url) {
    return <img onClick={this.handleClick} src={url} className="indiv" />;
  }

  render() {
    return (
      <div>
        <div className="allimage">
          {this.state.allMemeImgs.map(myimage => this.renderImage(myimage.url))}
        </div>

        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.topText}
            name="topText"
            placeholder="What should go to the top.."
            onChange={this.handleChange}
          />
          <input
            type="text"
            value={this.state.bottomText}
            name="bottomText"
            placeholder="What should go on the bottom.."
            onChange={this.handleChange}
          />
          <input
            type="text"
            value={this.state.leftText}
            name="leftText"
            placeholder="What should go at left side.."
            onChange={this.handleChange}
          />
          <input
            type="text"
            value={this.state.rightText}
            name="rightText"
            placeholder="What should go on the right side.."
            onChange={this.handleChange}
          />
          <button onClick={this.handleClick}>Gen</button>
        </form>

        <div className="meme">
          <img src={this.state.Img} alt="meme here" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
          <h2 className="left">{this.state.leftText}</h2>
          <h2 className="right">{this.state.rightText}</h2>
        </div>

        <div></div>
      </div>
    );
  }
}

export default MemeGenerator;
