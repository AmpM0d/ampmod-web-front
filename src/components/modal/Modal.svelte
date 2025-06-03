<script lang="ts">
    let {
      show = true,
      closeOnOutsideClick = true,
      titleContent,
      onClose,
      children
    } = $props<{
      show?: boolean;
      closeOnOutsideClick?: boolean;
      titleContent?: () => any;
      onClose?: () => void;
      children?: () => any;
    }>();
  
    function handleOutsideClick(event: MouseEvent) {
      if (closeOnOutsideClick && event.target === event.currentTarget) {
        close();
      }
    }
  
    function close() {
      show = false;
      if (onClose) {
        onClose();
      }
    }
  </script>
  
  {#if show}
    <div class="modal-overlay" on:click={handleOutsideClick}>
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title">
            {titleContent ?? titleContent}
          </div>
          <button class="close-button" on:click={close}> × </button>
        </div>
        <div class="modal-body">
          {@render children?.()}
        </div>
      </div>
    </div>
  {/if}
  
  <style>
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
  
    .modal-content {
      background-color: var(--footer-background);
      border-radius: 8px;
      text-align: center;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
    }
  
    .modal-header {
      background-color: #59C059;
      color: white;
      padding: 0.75rem 1rem;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    .modal-title {
      font-size: 1.25rem;
      font-weight: bold;
    }
  
    .close-button {
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0;
      line-height: 1;
    }
  
    .modal-body {
      padding: 2rem;
    }
  </style>