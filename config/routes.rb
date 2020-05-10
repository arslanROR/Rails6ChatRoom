Rails.application.routes.draw do
  devise_for :users
  # devise_for :users, controllers: { sessions: 'users/sessions' }
  resources :messages
  root 'home#index'
  get '/current_user', to: 'home#get_current_user'
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
