import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ShopInfo from './components/shopInfo.jsx';
import SearchBar from './components/searchBar.jsx';
import ProductGrid from './components/productGrid.jsx';

class ShopProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shopInfo: {
        city: null,
        name: null,
        shop_image_url: null,
      },
      shopProducts: {},
      displayProducts: {},
      search: null,
      currentProdId: Number(window.location.pathname.slice(1,2)),
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.updateSearchState = this.updateSearchState.bind(this);
  }
  componentDidMount() {
    this.getShopProductInfo();
  }

  handleSearch(e) {
    e.preventDefault();
    this.updateDisplayProducts();
  }

  updateSearchState(e){
    e.preventDefault();
    this.setState({search: e.target.value.toLowerCase()})
  }

  updateDisplayProducts() {
    let searchResult = {};
    if (this.state.search !== null) {
      Object.entries(this.state.shopProducts).forEach((prod) => {
        const prodName = prod[0].toLowerCase();
        if (prodName.includes(this.state.search)) {
          searchResult[prod[0]] = prod[1];
        }
      })
    
      this.setState({
        displayProducts: searchResult,
        search: null
      })
   } else {
     this.setState({
       displayProducts: this.state.shopProducts
     })
   }
  }

  getShopProductInfo() {
    axios.get(`${window.location.pathname}shopproducts/`)
      .then((response) => {
        console.log('THIS IS THE DATA:', response.data)
        const products = response.data.rows.slice(1);
        const sortByProductsId = {};
        products.forEach((item) => {
          let prodName = item.name;
          sortByProductsId[prodName]
            ? (sortByProductsId[prodName].imgs_url.push(item.image_url))
            : sortByProductsId[prodName] = {
              id: item.id,
              price: Number(item.price).toFixed(2),
              liked: item.liked,
              imgs_url: [item.image_url],
            };
        });
        this.setState({
          shopInfo: response.data.rows[0],
          shopProducts: sortByProductsId,
          displayProducts: sortByProductsId,
        });
      })
      .catch(error => console.log('Error: ', error));
  }

  render() {
    return (
      <div className="shopProductsContainer">
        <ShopInfo info={this.state.shopInfo} />
        <SearchBar handleSearch={this.handleSearch} updateSearchState={this.updateSearchState}/>
        <ProductGrid displayProducts={this.state.displayProducts} search={this.state.search}/>
      </div>
    );
  }
}

ReactDOM.render(<ShopProducts />, document.getElementById('shopProducts'));

