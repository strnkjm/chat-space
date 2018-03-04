class GroupsController < ApplicationController
  def new
    groups = Group.find(params[:id])
  end

  def edit
  end

  def update
    @group.update(group_params)
    redirect_to :root, notice: 'グループが更新されました'
  end
end
