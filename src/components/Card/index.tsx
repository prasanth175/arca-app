import { Component } from 'react'
// import Loader from "react-loader-spinner";
import './index.css'
import { HiArrowNarrowRight } from 'react-icons/hi'

// Define the type for the component state
type CardState = {
  li: any[],
  parentNull: any[],
  subParent: any[],
  renderedData: JSX.Element | null,
  isLoading: boolean,
}

class Card extends Component<{}, CardState> {
  state: CardState = {
    li: [],
    parentNull: [],
    subParent: [],
    renderedData: null,
    isLoading: true,
  }

  componentDidMount = async () => {
    const url = 'https://xcool.in/api/test5m23'
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 1|FWItRXH5DCAN9rjBjIhfH9KMnprvKZweoK2Jfi5T',
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    // Set the state after fetching data and call the `renderParentNull` method
    this.setState({ li: data.data, isLoading: false }, this.renderParentNull)
  }

  // renderLoader = (): JSX.Element => (
  //   <div className="loader-container">
  //     <Loader type="Oval" color="#00BFFF" height={80} width={80} />
  //   </div>
  // );

  renderLoadingText = (): JSX.Element => (
    <div className="loader-container">
      <h1 className='load-txt'>Loading.....</h1>
    </div>
  );

  renderData = (item: any) => (
    <div>
      <h1>{item}</h1>
    </div>
  )

  renderParentData = (item: any) => (
    <div>
      <h1>{item}</h1>
    </div>
  )

  renderEachParent = (id: number, name: string) => {
    const { li } = this.state

    // Filter data to get the child data for the parent
    const filData = li.filter(
      each => each.parentId === id && each.type === 'Category',
    )

    // Map through the child data to get sub-child data for each child
    const subChildData = filData.map(each => {
      const child = li.filter(
        item => item.category_id === each.id && item.type === 'Course',
      )

      // Return the sub-child elements for each child element
      return (
        <div key={each.id}>
          <div className="sub-parent">
            {name} <HiArrowNarrowRight className="icon" /> {each.name}
          </div>
          {child.map(sub => (
            <div key={sub.id}>
              <div className="child">
                {name}
                <HiArrowNarrowRight className="icon" /> {each.name}
                <HiArrowNarrowRight className="icon" />
                {sub.name}
              </div>
            </div>
          ))}
        </div>
      )
    })

    // Return the parent element and the sub-child elements
    return (
      <div>
        <div className="parent">{name}</div>
        {subChildData}
      </div>
    )
  }

  renderSubParent = () => {
    const { parentNull } = this.state;
    const data = parentNull.map((each) =>
      this.renderEachParent(each.id, each.name)
    );
    this.setState({ renderedData: <>{data}</> });
  };

  renderParentNull = (): void => {
    const { li } = this.state;
    const filData = li.filter(
      each => each.parentId === null && each.type === 'Category',
    );
    this.setState({ parentNull: filData }, this.renderSubParent);
  };

    // Set the `renderedData` state variable to the rendered data

    render(): JSX.Element {
      const { renderedData, isLoading } = this.state;
      return (
        <div className="main-container">
          {isLoading ? (
            this.renderLoadingText()
          ) : (
            <div className="mid-container">{renderedData}</div>
          )}
          </div>)} 
}

export default Card