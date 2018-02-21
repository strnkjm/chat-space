Rails.application.routes.draw do
  root to: 'messages#index'
  resource :messages, only: [:index] do
    resource :groups, only: [:new, :edit, :update]
  end
  resource :users, only: [:edit, :update]
end
