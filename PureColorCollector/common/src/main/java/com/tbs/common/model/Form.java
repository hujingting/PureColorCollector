package com.app.model.form;

import com.alibaba.fastjson.annotation.JSONField;

import java.io.Serializable;

public abstract class Form implements Serializable {
	private static final long serialVersionUID = -8382548723582459523L;
	@JSONField(serialize=false)
	public boolean closeCurrentPage = false; //跳转后结束当前界面
	@JSONField(serialize=false)
	public boolean  isOpenNewTask=false;//是否需要清栈
}
