import Web3 from 'web3';
import { abi } from '../../config';

export default {
  namespaced: true,
  state: {
    web3: {
      isInjected: false,
      web3Instance: null,
      networkId: null,
      coinbase: null,
      balance: null,
      error: null,
    },
    web3active: false
  },
  getters: {
  },
  mutations: {
    setWeb3Active(state, {active}){
      state.web3active = active;
    }
  },
  actions: {
    connectWeb3({ state, commit }) {
      if (typeof window.web3 !== 'undefined') {
        commit('setWeb3Active', {active: true});
        state.web3active = true
        this.web3Instance = new Web3(window.web3.currentProvider);
        this.coinbase = this.web3Instance.eth.accounts[0];
        setInterval(() => {
          this.web3Instance.eth.getCoinbase((err, coinbase) => {
            if (err) {
            } else if (coinbase !== state.coinbase) {
              state.coinbase = coinbase;
            }
          });
        }, 100);
      }
    },
    becomeInvestor({ state, rootState }, value) {
      const weiValue = this.web3Instance.utils.toWei(value.toFixed(2));
   
      const contractAddress = rootState.project.ito.contract_address
      return this.web3Instance.eth.sendTransaction({ from: state.coinbase, value:weiValue, to: contractAddress})
        .on('receipt', (receipt) => {
          console.log(receipt);
        })
        .on('error', (error) => {
          console.log(error);
        });
    },
    addWallets({dispatch}) {
      this.web3Instance.eth.getAccounts().then(accounts => {

        for (var wallet of accounts){
          dispatch('project/addWallet', wallet ,{root:true})
        }
      });
    }
  },
};
