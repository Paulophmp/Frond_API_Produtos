<template>
  <v-container>
    <v-card>
      <v-card>
        <v-container fluid>
          <v-layout
            row
            wrap>
            <v-flex xs6>
              <h2 class="mr-3 blue--text">Cadastrar Pedido</h2>
            </v-flex>
            <v-flex
              xs5
              offset-xs1
              class=" text-xs-right">
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-container
        fluid
      >
        <v-form
          enctype="multipart/form-data"
          ref="form"
          files="true"
          v-model="valid"
          lazy-validation
        >
          <v-container>
            <v-layout>
              <v-flex
                xs12
                md6>
                <v-select
                  v-model="tipobusca"
                  :items="listarProdutosGetter"
                  item-text="nome"
                  item-value="id"
                  label="Produto =)"
                  @change="searchProdutos()"
                ></v-select>
              </v-flex>

              <v-flex
                xs12
                md6
              >
                <v-text-field
                  v-model="cadastrar.solicitante"
                  :rules="nomeRules"
                  label="Quantidade"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex
                xs12
                md6
              >
                <v-text-field
                  v-model="cadastrar.solicitante"
                  :rules="nomeRules"
                  label="Valor Unitario"
                  disabled
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex
                xs12
                md6
              >
                <v-text-field
                  v-model="cadastrar.solicitante"
                  :rules="nomeRules"
                  label="Nome do solicitante"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex
                xs12
                md6
              >
                <v-text-field
                  v-model="cadastrar.despachante"
                  :rules="valorRules"
                  label="Nome do Despachante"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>

{{listarProdutosGetter}}
<!--cep-->
            <v-layout>
              <v-flex
                xs12
                md4
              >
                <v-text-field
                  :counter="8"
                  label="CEP"
                  v-model="cep"
                  :mask="maskCEP"
                  :rules="cepRules"
                  @keyup="searchCep"
                  @keydown="searchCep($event)"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout  v-if="cep != null && cep.length === 8">
              <v-flex
                xs12
                md4
              >
                <v-text-field
                  label="Logradouro"
                  v-model="logradouro"
                  box
                  required
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex
                xs12
                md4
              >
                <v-text-field
                  label="Número"
                  v-model="numero"
                  ref="numeroCep"
                  required
                  box
                  clearable
                ></v-text-field>
              </v-flex>

              <v-flex
                xs12
                md4
              >
                <v-text-field
                  label="Complemento"
                  required
                  box
                  v-model="complemento"
                  clearable
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout v-if="cep != null && cep.length === 8">
              <v-flex
                xs12
                md4
              >
                <v-text-field
                  label="Bairro"
                  required
                  box
                  v-model="bairro"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex
                xs12
                md4
              >
                <v-text-field
                  label="Cidade"
                  required
                  box
                  v-model="localidade"
                  clearable
                ></v-text-field>
              </v-flex>

              <v-flex
                xs12
                md4
              >
                <v-text-field
                  :counter="2"
                  label="UF"
                  required
                  v-model="uf"
                  box
                  clearable
                ></v-text-field>
              </v-flex>
            </v-layout>
<!--            fim cep-->

            <v-layout>
              <v-snackbar
                v-model="snackbar"
                :multi-line="mode === 'multi-line'"
                right
                :timeout="timeout"
                bottom
                :color="statusSnackBar"
                :vertical="mode === 'vertical'"
              >
                {{ text }}
                <v-btn
                  dark
                  flat
                  @click="snackbar = false"
                >
                  <v-icon>clear</v-icon>
                </v-btn>
              </v-snackbar>
            </v-layout>
            <div class="text-xs-right">
              <v-btn @click="submit" :loading="loading"> Cadastrar </v-btn>
              <v-btn @click="resetValidation"> Limpar </v-btn>
            </div>
          </v-container>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CadastrarPedido',
  data() {
    return {
      // cep
      cep: '',
      maskCEP: '##.###-###',
      logradouro: '',
      complemento: '',
      bairro: '',
      localidade: '',
      numero: '',
      uf: '',

      selected: '',
      tipobusca: '',
      items: [],
      itemsId: '',
      loading: false,
      statusSnackBar: '',
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 2500,
      text: '',
      cadastrar: {
        nome: '',
        solicitante: '',
        despachante: '',
        situacao: 'd',
      },
      valid: true,
      data: null,
      show3: false,
      nomeRules: [
        v => !!v || 'Nome is required',
      ],
      qtdRules: [
        v => !!v || 'Valor is required',
      ],
      valorRules: [
        v => !!v || 'Quantidade is required',
      ],
      cepRules: [
        v => !!v || 'Cep is required',
        v => v.length >= 8 || 'Cep must be less than  8 characters',
      ],
    };
  },
  created() {
    this.listarProdutosAction();
  },
  computed: {
    ...mapGetters({
      listarProdutosGetter: 'produto/listarProdutosGetter',
      nomeProdutosGetter: 'produto/leanListarProdutosGetter',
    }),
  },
  methods: {
    ...mapActions({
      cadastrarProdutosAction: 'produto/cadastrarProdutosAction',
      listarProdutosAction: 'produto/listarProdutosAction',
    }),
    submit() {
      console.log('aaaadsdsd', this.cadastrar);
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.cadastrarProdutosAction(this.cadastrar).then(() => {
          this.loading = false;
        });
        this.menssageSuccess();
        this.resetValidation();
      } else {
        this.menssageError();
      }
    },
    resetValidation() {
      this.$refs.form.reset();
    },
    menssageSuccess(text = 'Cadastrado com sucesso!') {
      this.statusSnackBar = 'success';
      this.text = text;
      this.snackbar = true;
    },
    menssageError(text = 'Erro ao cadastrar!') {
      this.statusSnackBar = 'error';
      this.text = text;
      this.snackbar = true;
    },
    searchCep() {
      if (this.cep != null && this.cep.length === 8) {
        axios.get(`https://viacep.com.br/ws/${this.cep}/json/`)
          .then((response) => {
            this.showResults(response.data);
          })
          .catch(error => console.log(error));
      }
    },
    searchProdutos(a) {
      console.log(a);
      axios.get('http://localhost:8000/produto')
        .then((response) => {
          this.items = response.data;
          this.itemsId = response.data.id;
        })
        .catch(error => console.log(error));
    },
    showResults(address) {
      this.logradouro = address.logradouro;
      this.complemento = address.complemento;
      this.bairro = address.bairro;
      this.localidade = address.localidade;
      this.uf = address.uf;
      this.$refs.numeroCep.focus();
    },
  },
};
</script>
