<template>
    <div class="col-sm-8">
        <h4>Добавление картинки</h4>
        <div v-if="!submitted">
            <form @submit="addCard">
                <div class="form-group mb-3">
                    <input type="file" id="file" ref="file" class="form-control" accept=".jpg, .jpeg, .png, .gif, .bmp" required v-on:change="handleFileUpload()"/>
                </div>
                <div class="form-group">
                    <input type="submit" class="btn btn-success" value="Добавить">
                </div>
            </form>
        </div>
        <div v-else>
            <h5>{{message}}</h5>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "AddCard",
        props: ['id'],
        data() {
            return {
                card: {
                    name: "",
                    file: ""
                },
                message: "",
                submitted: false
            };
        },
        methods: {
            addCard(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                let formData = new FormData();
                formData.append('file', this.card.file);
                console.log(this.id);
                formData.append('listing_id', this.id);

                http
                    .post("/listingImages", formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(() => { // запрос выполнился успешно
                        this.$router.push('/listings/' + this.id); // переходим к списку студентов
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                        this.message = "Запись не добавлена в базу данных, повторите попытку или обратитесь к администратору для выяснения причины ошибки";
                    });
                this.submitted = true;
            },
            handleFileUpload(){
                this.card.file = this.$refs.file.files[0];
            }
        }
    }
</script>