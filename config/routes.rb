Rails.application.routes.draw do
  root to: 'messages#index'
  resource :messages, only: [:index]
  resource :users, only: [:edit, :update]
  resource :groups, only: [:new, :edit, :update]
end
