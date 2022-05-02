import BaseView from './BaseView';

class LoginFormView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('');
    }

    getData(param) {
        const name = param;
        return this.DataService.getUser(name);
    }
}

/* 
<!-- ----------------------------- LOGIN FORM ------------------------------ -->
            <div class="container container__login hide-element" id="loginAccount">
                <h2 class="container__login-title">Login</h2>
                <form action="#" class="form form__login">
                    <!-- Email -->
                    <div class="form__login-control">
                        <input id="loginUserName" type="text" placeholder="Email" />
                        <i class="fas fa-exclamation-circle error-icon hide-element"></i>
                        <i class="far fa-check-circle success-icon hide-element"></i>
                        <small class="error-message"></small>
                    </div>
                    <!-- Password -->
                    <div class="form__login-control">
                        <input id="loginPassword" type="password" placeholder="Password" />
                        <i class="fas fa-exclamation-circle error-icon hide-element"></i>
                        <i class="far fa-check-circle success-icon hide-element"></i>
                        <small class="error-message"></small>
                    </div>

                    <input id="loginBtn" class="btn form__login-btn" type="submit" value="Login" />
                    <p class="form__login-text">
                        Don't have an account?
                        <a class="form__login-text--link" href="#SignUp" id="signUpLink"
                            >Sign Up!</a
                        >
                    </p>
                </form>
            </div>
*/
